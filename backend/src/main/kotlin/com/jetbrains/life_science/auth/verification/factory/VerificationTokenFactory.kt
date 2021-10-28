package com.jetbrains.life_science.auth.verification.factory

import com.jetbrains.life_science.auth.verification.entity.VerificationToken
import com.jetbrains.life_science.user.credentials.entity.Credentials
import org.springframework.stereotype.Component

@Component
class VerificationTokenFactory {
    fun create(credentials: Credentials, token: String): VerificationToken {
        return VerificationToken(
            id = 0,
            token = token,
            credentials = credentials
        )
    }
}
