package com.jetbrains.life_science.auth.verification.factory

import com.jetbrains.life_science.auth.verification.entity.VerificationToken
import com.jetbrains.life_science.user.credentials.entity.Credentials
import org.springframework.stereotype.Component
import java.util.*

@Component
class VerificationTokenFactory {
    fun create(credentials: Credentials): VerificationToken {
        return VerificationToken(
            id = 0,
            token = UUID.randomUUID().toString(),
            credentials = credentials
        )
    }
}
