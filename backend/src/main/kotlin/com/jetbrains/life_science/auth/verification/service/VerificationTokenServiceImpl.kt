package com.jetbrains.life_science.auth.verification.service

import com.jetbrains.life_science.auth.verification.entity.VerificationToken
import com.jetbrains.life_science.auth.verification.factory.VerificationTokenFactory
import com.jetbrains.life_science.auth.verification.repository.VerificationTokenRepository
import com.jetbrains.life_science.exception.auth.ExpiredVerificationTokenException
import com.jetbrains.life_science.exception.auth.InvalidVerificationTokenException
import com.jetbrains.life_science.user.credentials.entity.Credentials
import com.jetbrains.life_science.user.credentials.service.CredentialsService
import com.jetbrains.life_science.util.UTCZone
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
class VerificationTokenServiceImpl(
    val factory: VerificationTokenFactory,
    val repository: VerificationTokenRepository,
    val credentialsService: CredentialsService
) : VerificationTokenService {

    override fun createVerificationToken(credentials: Credentials): VerificationToken {
        val verificationToken = factory.create(credentials)
        return repository.save(verificationToken)
    }

    @Transactional
    override fun validateVerificationToken(token: String): Credentials {
        val verificationToken = repository.findByToken(token)
        val credentials = verificationToken.credentials
        if (verificationToken.token != token) {
            throw InvalidVerificationTokenException()
        }
        if (verificationToken.expiryDate.isBefore(LocalDateTime.now(UTCZone))) {
            throw ExpiredVerificationTokenException()
        }
        credentialsService.validateUser(credentials.id)
        deleteVerificationToken(credentials)
        return credentials
    }

    @Transactional
    override fun updateVerificationToken(credentials: Credentials): VerificationToken {
        deleteVerificationToken(credentials)
        return createVerificationToken(credentials)
    }

    @Transactional
    override fun deleteVerificationToken(credentials: Credentials) {
        if (repository.existsByCredentials(credentials)) {
            repository.deleteByCredentials(credentials)
        }
    }
}
