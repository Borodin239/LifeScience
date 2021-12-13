package com.jetbrains.life_science.controller.auth.dto

import com.jetbrains.life_science.util.passwordRegexp
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Pattern

data class NewUserDTO(

    @NotBlank
    val firstName: String,

    @NotBlank
    val lastName: String,

    @field:Email(
        message = "Email must be valid"
    )
    val email: String,

    @field:Pattern(
        regexp = passwordRegexp,
        message = "Password must contain only allowed characters"
    )
    val password: String
)
