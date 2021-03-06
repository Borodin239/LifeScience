package com.jetbrains.life_science.auth.verification.service

import com.jetbrains.life_science.auth.verification.entity.VerificationToken
import com.jetbrains.life_science.user.credentials.entity.Credentials

interface VerificationTokenService {
    fun createVerificationToken(credentials: Credentials): VerificationToken
    fun updateVerificationToken(credentials: Credentials): VerificationToken
    fun validateVerificationToken(token: String): Credentials
    fun deleteVerificationToken(credentials: Credentials)
}
