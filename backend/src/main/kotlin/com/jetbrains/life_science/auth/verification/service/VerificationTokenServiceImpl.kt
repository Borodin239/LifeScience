package com.jetbrains.life_science.auth.verification.service

import com.jetbrains.life_science.auth.verification.entity.VerificationToken
import com.jetbrains.life_science.auth.verification.factory.VerificationTokenFactory
import com.jetbrains.life_science.auth.verification.repository.VerificationTokenRepository
import com.jetbrains.life_science.user.credentials.entity.Credentials
import org.springframework.stereotype.Service

@Service
class VerificationTokenServiceImpl(
    val factory: VerificationTokenFactory,
    val repository: VerificationTokenRepository
) : VerificationTokenService {

    override fun createVerificationToken(credentials: Credentials, token: String): VerificationToken {
        val verificationToken = factory.create(credentials, token)
        return repository.save(verificationToken)
    }
}
