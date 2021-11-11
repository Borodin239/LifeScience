package com.jetbrains.life_science.controller.auth

import com.jetbrains.life_science.ApiTest
import com.jetbrains.life_science.auth.jwt.JWTServiceImpl
import com.jetbrains.life_science.auth.refresh.factory.RefreshTokenFactoryImpl
import com.jetbrains.life_science.controller.auth.dto.NewUserDTO
import com.jetbrains.life_science.controller.auth.dto.ResendEmailDTO
import com.jetbrains.life_science.util.emails.RandomPortInitializer
import com.jetbrains.life_science.util.emails.WiserAssertions
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.web.servlet.*
import org.subethamail.wiser.Wiser
import javax.servlet.http.Cookie

@Sql("/scripts/initial_data.sql", "/scripts/auth/verification.sql")
@ContextConfiguration(initializers = [RandomPortInitializer::class])
internal class AuthControllerTest : ApiTest() {

    @Value("\${spring.mail.host}")
    lateinit var smtpHost: String

    @Value("\${spring.mail.port}")
    var smtpPort: Int = 0

    lateinit var wiser: Wiser

    @BeforeEach
    fun startEmailServer() {
        wiser = Wiser()
        wiser.setPort(smtpPort)
        wiser.setHostname(smtpHost)
        wiser.start()
    }

    @AfterEach
    fun stopEmailServer() {
        wiser.stop()
    }

    @Autowired
    lateinit var jwtServiceImpl: JWTServiceImpl

    @Autowired
    lateinit var refreshTokenFactoryImpl: RefreshTokenFactoryImpl

    val pingPath = "/api/ping/secured"

    /**
     * Success register test.
     *
     * Should create an inactive profile and send verification email.
     * Expected failed attempt to login by these credentials
     * with 401 http code error and 401_006 system code.
     */
    @Test
    fun `register test`() {
        // Prepare data
        val password = "sample_password123=+"
        val login = "sobaka@mail.ru"
        val expectedSubject = "Welcome to JetScience. Let’s verify your email"

        // Action
        register(login, password)

        // Assert
        WiserAssertions.assertReceivedMessage(wiser)
            .to(login)
            .withSubject(expectedSubject)
        val apiExceptionView = getApiExceptionView(
            401,
            loginRequest(login, password)
        )
        assertEquals(401_006, apiExceptionView.systemCode)
        assertEquals(login, apiExceptionView.arguments[0][0])
    }

    /**
     * Already used email test.
     *
     * Expected 400 http code and 400_004 system code result.
     */
    @Test
    fun `already used email test`() {
        val expectedEmail = "admin@gmail.ru"
        val apiExceptionView = getApiExceptionView(
            400,
            registerRequest(expectedEmail, "pass123")
        )
        assertEquals(400_004, apiExceptionView.systemCode)
        assertEquals("admin@gmail.ru", apiExceptionView.arguments[0][0])
    }

    /**
     * Invalid email format register test.
     *
     * Expected 400 http code and 400_005 system code result.
     */
    @Test
    fun `invalid email format register test`() {
        val apiExceptionView = getApiExceptionView(
            400,
            registerRequest("wrongwrong.com", "pass123456")
        )
        assertEquals(400_005, apiExceptionView.systemCode)
        assertEquals("Email must be valid", apiExceptionView.arguments[0][0])
    }

    /**
     * Invalid password format register test.
     *
     * Expected 400 http code and 400_005 system code result.
     */
    @Test
    fun `invalid password format register test`() {
        val apiExceptionView = getApiExceptionView(
            400,
            registerRequest("abc@mail.ru", "                ")
        )
        assertEquals(400_005, apiExceptionView.systemCode)
        assertEquals("Password must contain only allowed characters", apiExceptionView.arguments[0][0])
    }

    /**
     * Resend email test. It should resend email with a
     * verification token.
     */
    @Test
    fun `resend email test`() {
        // Prepare data
        val login = "inactive@gmail.ru"
        val expectedSubject = "Welcome to JetScience. Let’s verify your email"

        // Action
        resend(login)

        // Assert
        WiserAssertions.assertReceivedMessage(wiser)
            .to(login)
            .withSubject(expectedSubject)
    }

    /**
     * Success login test.
     *
     * Access token in response and refresh token in cookie expected.
     * Expected success ping secured endpoint.
     */
    @Test
    fun `login test`() {
        val tokens = login("admin@gmail.ru", "password")
        pingSecured(tokens)
    }

    /**
     * Successfully verifies user's email.
     */
    @Test
    fun `verification test`() {
        // Prepare data
        val token = "token1"
        val login = "inactive@gmail.ru"
        val password = "user123"

        // Action
        verification(token)

        // Assert
        val loginTokens = login(login, password)
        pingSecured(loginTokens)
    }

    /**
     * Tries to verify user's email by invalid verification token.
     */
    @Test
    fun `invalid verification token test`() {
        // Prepare data
        val token = "token239"

        // Action
        val apiExceptionView = getApiExceptionView(401, verificationRequest(token))

        // Assert
        assertEquals(401_007, apiExceptionView.systemCode)
        assertTrue(apiExceptionView.arguments.isEmpty())
    }

    /**
     * Tries to verify user's email by expired verification token.
     */
    @Test
    fun `expired verification token test`() {
        // Prepare data
        val token = "token3"

        // Action
        val apiExceptionView = getApiExceptionView(401, verificationRequest(token))

        // Assert
        assertEquals(401_008, apiExceptionView.systemCode)
        assertTrue(apiExceptionView.arguments.isEmpty())
    }

    /**
     * Success refresh token rest
     *
     * Expected successful login and ping secured endpoint before and after refresh.
     */
    @Test
    fun `refresh token test`() {
        val loginTokens = login("admin@gmail.ru", "password")
        pingSecured(loginTokens)

        val refreshedTokens = refresh(loginTokens)

        assertNotEquals(loginTokens, refreshedTokens)
        pingSecured(refreshedTokens)
    }

    /**
     * Invalid credentials test.
     *
     * Expected 401 http code and 401_005 system code result.
     */
    @Test
    fun `invalid credentials test`() {
        val apiExceptionView = getApiExceptionView(
            401,
            loginRequest("wrong@wrong.com", "wrond_pass999")
        )
        assertEquals(401_005, apiExceptionView.systemCode)
        assertTrue(apiExceptionView.arguments.isEmpty())
    }

    /**
     * Invalid access token test.
     *
     * Expected 401 http code and 401_003 system code result.
     */
    @Test
    fun `invalid access token test`() {
        val apiExceptionView = getApiExceptionView(
            401,
            pingSecuredRequest(TokenPair("wrong token", "error"))
        )
        assertEquals(401_003, apiExceptionView.systemCode)
        assertTrue(apiExceptionView.arguments.isEmpty())
    }

    /**
     * Invalid refresh token test.
     *
     * Expected 401 http code and 401_001 system code result.
     */
    @Test
    fun `invalid refresh token test`() {
        val apiExceptionView = getApiExceptionView(
            401,
            refreshRequest("error")
        )
        assertEquals(401_001, apiExceptionView.systemCode)
        assertTrue(apiExceptionView.arguments.isEmpty())
    }

    /**
     * Expired access token test.
     *
     * Expected 401 http code and 401_004 system code result.
     */
    @Test
    fun `expired access token test`() {
        val oldExpirationTime = jwtServiceImpl.jwtExpirationSeconds
        try {
            jwtServiceImpl.jwtExpirationSeconds = 1
            val loginTokens = login("admin@gmail.ru", "password")

            // Wait for jwt to expire
            Thread.sleep(2_000)

            val pingRequest = getApiExceptionView(401, pingSecuredRequest(loginTokens))
            assertEquals(401_004, pingRequest.systemCode)
            assertTrue(pingRequest.arguments.isEmpty())
        } finally {
            jwtServiceImpl.jwtExpirationSeconds = oldExpirationTime
        }
    }

    /**
     * Expired refresh token test.
     *
     * Expected 401 http code and 401_002 system code result.
     */
    @Test
    fun `expired refresh token test`() {
        val oldExpirationTime = refreshTokenFactoryImpl.refreshExpirationSeconds
        try {
            refreshTokenFactoryImpl.refreshExpirationSeconds = 1
            val loginTokens = login("admin@gmail.ru", "password")

            // Wait for jwt to expire
            Thread.sleep(2_000)

            val refreshRequest = getApiExceptionView(
                401,
                refreshRequest(loginTokens.refreshToken)
            )
            assertEquals(401_002, refreshRequest.systemCode)
            assertTrue(refreshRequest.arguments.isEmpty())
        } finally {
            refreshTokenFactoryImpl.refreshExpirationSeconds = oldExpirationTime
        }
    }

    private fun pingSecured(tokens: TokenPair) {
        val pingRequest = pingSecuredRequest(tokens)
        assertOkAndReturn(pingRequest)
    }

    fun refresh(tokenPair: TokenPair): TokenPair {
        val refreshRequest = refreshRequest(tokenPair.refreshToken)
        val refreshResponse = assertOkAndReturn(refreshRequest)
        return getTokens(refreshResponse)
    }

    private fun refreshRequest(refreshToken: String) =
        mockMvc.patch(makeAuthPath("/refresh")) {
            cookie(Cookie("refresh", refreshToken))
        }

    fun pingSecuredRequest(tokenPair: TokenPair) =
        mockMvc.get(pingPath) {
            cookie(Cookie("refresh", tokenPair.refreshToken))
            headers { add("Authorization", "Bearer ${tokenPair.accessToken}") }
        }

    fun register(email: String, password: String) {
        val registerRequest = registerRequest(email, password)
        assertOkAndReturn(registerRequest)
    }

    fun resend(email: String) {
        val resendRequest = resendRequest(email)
        assertOkAndReturn(resendRequest)
    }

    fun verification(token: String) {
        val verificationRequest = verificationRequest(token)
        assertOkAndReturn(verificationRequest)
    }

    private fun resendRequest(
        email: String
    ) = mockMvc.patch(makeAuthPath("/confirmation/resend")) {
        contentType = MediaType.APPLICATION_JSON
        content = objectMapper.writeValueAsString(ResendEmailDTO(email))
    }

    private fun registerRequest(
        email: String,
        password: String
    ) = mockMvc.post(makeAuthPath("/register")) {
        contentType = MediaType.APPLICATION_JSON
        content = objectMapper.writeValueAsString(NewUserDTO("firstName", "lastName", email, password))
        accept = MediaType.APPLICATION_JSON
    }

    private fun verificationRequest(token: String) = mockMvc.patch(makeAuthPath("/confirmation/$token"))
}
