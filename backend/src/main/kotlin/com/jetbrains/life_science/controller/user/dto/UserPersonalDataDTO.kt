package com.jetbrains.life_science.controller.user.dto

import javax.validation.constraints.NotBlank

data class UserPersonalDataDTO(
    @NotBlank
    val firstName: String,

    @NotBlank
    val lastName: String,

    val doctorDegree: Boolean,

    val academicDegree: String,

    val organisations: List<Long>,

    val about: String?,

    val orcid: String?,

    val researchId: String?
)
