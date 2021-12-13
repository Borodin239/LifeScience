package com.jetbrains.life_science.auth.verification.service

import com.jetbrains.life_science.auth.verification.repository.VerificationTokenRepository
import com.jetbrains.life_science.exception.auth.ExpiredVerificationTokenException
import com.jetbrains.life_science.exception.auth.InvalidVerificationTokenException
import com.jetbrains.life_science.user.credentials.service.CredentialsService
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.jdbc.Sql
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Sql("/scripts/initial_data.sql", "/scripts/auth/verification.sql")
@Transactional
class VerificationTokenServiceTest {

    @Autowired
    lateinit var service: VerificationTokenService

    @Autowired
    lateinit var credentialsService: CredentialsService

    @Autowired
    lateinit var repository: VerificationTokenRepository

    /**
     * Deletes existing verification token by credentials and do nothing
     * in cas verification token doesn't exist for current credentials.
     */
    @Test
    fun `delete existing verification token`() {
        // Prepare data
        val credentialsIdTokenDoesNotExist = 3L
        val credentialsIdTokenExists = 4L
        val credentialsTokenDoesNotExist = credentialsService.getById(credentialsIdTokenDoesNotExist)
        val credentialsTokenExists = credentialsService.getById(credentialsIdTokenExists)

        // Pre-check
        assertTrue(repository.existsByCredentials(credentialsTokenExists))
        assertFalse(repository.existsByCredentials(credentialsTokenDoesNotExist))

        // Action
        service.deleteVerificationToken(credentialsTokenExists)
        service.deleteVerificationToken(credentialsTokenDoesNotExist)

        // Assert
        assertFalse(repository.existsByCredentials(credentialsTokenExists))
        assertFalse(repository.existsByCredentials(credentialsTokenDoesNotExist))
    }

    /**
     * Create verification token for new user.
     */
    @Test
    fun `create verification token`() {
        // Prepare data
        val credentialsId = 3L
        val credentials = credentialsService.getById(credentialsId)

        // Pre-check
        assertFalse(repository.existsByCredentials(credentials))

        // Action
        service.createVerificationToken(credentials)

        // Assert
        assertTrue(repository.existsByCredentials(credentials))
    }

    /**
     * Update verification token for new user.
     */
    @Test
    fun `update verification token`() {
        // Prepare data
        val credentialsId = 3L
        val credentials = credentialsService.getById(credentialsId)
        val oldToken = "token"

        // Action
        val newToken = service.updateVerificationToken(credentials).token

        // Assert
        assertTrue(repository.existsByCredentials(credentials))
        assertNotEquals(oldToken, newToken)
    }

    /**
     * Validate verification token.
     */
    @Test
    fun `validate verification token`() {
        // Prepare data
        val credentialsId = 4L
        val token = "token1"

        // Action
        service.validateVerificationToken(token)
        val credentials = credentialsService.getById(credentialsId)

        // Assert
        assertFalse(repository.existsByCredentials(credentials))
        assertTrue(credentials.enabled)
    }

    /**
     * Validate expired verification token. Should throw
     * ExpiredVerificationTokenException.
     */
    @Test
    fun `validate expired verification token`() {
        // Prepare data
        val token = "token2"

        // Action & Assert
        assertThrows<ExpiredVerificationTokenException> {
            service.validateVerificationToken(token)
        }
    }

    /**
     * Validate wrong verification token. Should throw
     * InvalidVerificationTokenException.
     */
    @Test
    fun `validate wrong verification token`() {
        // Prepare data
        val token = "token239"

        // Action & Assert
        assertThrows<InvalidVerificationTokenException> {
            service.validateVerificationToken(token)
        }
    }
}
