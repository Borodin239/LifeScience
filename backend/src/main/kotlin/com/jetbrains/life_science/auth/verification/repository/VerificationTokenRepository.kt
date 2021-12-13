package com.jetbrains.life_science.auth.verification.repository

import com.jetbrains.life_science.auth.verification.entity.VerificationToken
import com.jetbrains.life_science.user.credentials.entity.Credentials
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface VerificationTokenRepository : JpaRepository<VerificationToken, Long> {
    fun existsByCredentials(credentials: Credentials): Boolean
    fun deleteByCredentials(credentials: Credentials)
    fun findByToken(token: String): Optional<VerificationToken>
}
