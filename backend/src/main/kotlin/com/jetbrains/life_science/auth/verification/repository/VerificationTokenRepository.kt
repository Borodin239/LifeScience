package com.jetbrains.life_science.auth.verification.repository

import com.jetbrains.life_science.auth.verification.entity.VerificationToken
import org.springframework.data.jpa.repository.JpaRepository

interface VerificationTokenRepository : JpaRepository<VerificationToken, Long>
