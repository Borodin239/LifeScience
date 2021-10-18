package com.jetbrains.life_science.user.verification.entity

import com.jetbrains.life_science.user.credentials.entity.Credentials
import com.jetbrains.life_science.util.UTCZone
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "verification_tokens")
class VerificationToken(
    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "credentials_seq"
    )
    @SequenceGenerator(
        name = "credentials_seq",
        allocationSize = 1
    )
    val id: Long,

    val token: String,

    @OneToOne
    val credentials: Credentials
) {
    private val lifetimeInHours: Long = 24L
    val expiryDate: LocalDateTime = LocalDateTime.now(UTCZone).plusHours(lifetimeInHours)
}
