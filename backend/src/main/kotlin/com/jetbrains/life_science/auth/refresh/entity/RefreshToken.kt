package com.jetbrains.life_science.auth.refresh.entity

import com.jetbrains.life_science.user.credentials.entity.Credentials
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "refresh_token")
class RefreshToken(
    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "refresh_token_seq"
    )
    @SequenceGenerator(
        name = "refresh_token_seq",
        allocationSize = 1
    )
    val id: Long,

    val code: String,

    @OneToOne
    val credentials: Credentials,

    val expirationDateTime: LocalDateTime
)
