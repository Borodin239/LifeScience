package com.jetbrains.life_science.user.verification.repository

import com.jetbrains.life_science.user.verification.entity.VerificationToken
import org.springframework.data.jpa.repository.JpaRepository

interface VerificationTokenRepository : JpaRepository<VerificationToken, Long>
