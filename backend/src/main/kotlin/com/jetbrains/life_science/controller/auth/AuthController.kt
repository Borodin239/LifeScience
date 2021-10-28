package com.jetbrains.life_science.controller.auth

import com.jetbrains.life_science.controller.auth.dto.AuthRequestDTO
import com.jetbrains.life_science.auth.refresh.entity.RefreshTokenCode
import com.jetbrains.life_science.auth.service.AuthRequestToCredentialsAdapter
import com.jetbrains.life_science.auth.service.AuthService
import com.jetbrains.life_science.auth.verification.service.VerificationTokenService
import com.jetbrains.life_science.controller.auth.view.AccessTokenView
import com.jetbrains.life_science.controller.auth.view.AccessTokenViewMapper
import com.jetbrains.life_science.exception.auth.InvalidRefreshTokenException
import com.jetbrains.life_science.controller.auth.dto.NewUserDTO
import com.jetbrains.life_science.controller.auth.dto.NewUserDTOToInfoAdapter
import com.jetbrains.life_science.controller.auth.events.OnRegistrationCompleteEvent
import com.jetbrains.life_science.user.credentials.service.CredentialsService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationEventPublisher
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api/auth")
class AuthController(
    val authService: AuthService,
    val accessTokenViewMapper: AccessTokenViewMapper,
    val credentialsService: CredentialsService,
    val verificationTokenService: VerificationTokenService
) {

    @Autowired
    private lateinit var eventPublisher: ApplicationEventPublisher

    @Operation(summary = "Sign in")
    @PostMapping("/signin")
    fun login(
        @Validated @RequestBody authRequestDTO: AuthRequestDTO,
        httpServletResponse: HttpServletResponse
    ): AccessTokenView {
        val credentials = AuthRequestToCredentialsAdapter(authRequestDTO)
        val (accessToken, refreshToken) = authService.login(credentials)
        setRefreshTokenToCookie(httpServletResponse, refreshToken)
        return accessTokenViewMapper.toView(accessToken)
    }

    @Operation(summary = "Sign up")
    @PostMapping("/register")
    @Transactional
    fun register(
        @Validated @RequestBody userDto: NewUserDTO,
        request: HttpServletRequest,
        response: HttpServletResponse
    ) {
        val credentials = credentialsService.createUser(NewUserDTOToInfoAdapter(userDto))
        eventPublisher.publishEvent(OnRegistrationCompleteEvent(credentials, request.locale))
    }

    @Operation(summary = "Refreshes JWT and Refresh tokens")
    @PatchMapping("/refresh")
    fun refreshToken(
        request: HttpServletRequest,
        response: HttpServletResponse
    ): AccessTokenView {
        val refreshTokenCode = getRefreshToken(request.cookies)
        val (accessToken, refreshToken) = authService.refreshTokens(refreshTokenCode)
        setRefreshTokenToCookie(response, refreshToken)
        return accessTokenViewMapper.toView(accessToken)
    }

    @Operation(summary = "Confirm user's email via validation token")
    @GetMapping("/confirm/{token}")
    fun confirmRegistration(
        @PathVariable token: String,
        request: HttpServletRequest,
        response: HttpServletResponse
    )/*: AccessTokenView*/ {
        val credentials = verificationTokenService.validateVerificationToken(token)
        // TODO:: Как логиниться то ?
        //val (accessToken, refreshToken) = authService.login(credentials)
        //setRefreshTokenToCookie(response, refreshToken)
        //return accessTokenViewMapper.toView(accessToken)
    }

    private fun getRefreshToken(cookies: Array<Cookie>): RefreshTokenCode {
        val cookie = cookies.find { it.name == REFRESH_TOKEN_COOKIE_NAME } ?: throw InvalidRefreshTokenException()
        return RefreshTokenCode(cookie.value)
    }

    private fun setRefreshTokenToCookie(httpServletResponse: HttpServletResponse, refreshTokenCode: RefreshTokenCode) {
        val cookie = Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshTokenCode.code).apply {
            isHttpOnly = true
        }
        httpServletResponse.addCookie(cookie)
    }
}

private const val REFRESH_TOKEN_COOKIE_NAME = "refresh"
