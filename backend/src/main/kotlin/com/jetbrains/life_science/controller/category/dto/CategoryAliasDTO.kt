package com.jetbrains.life_science.controller.category.dto

import com.jetbrains.life_science.util.categoryNameRegexp
import javax.validation.constraints.Pattern

data class CategoryAliasDTO(
    @field:Pattern(
        regexp = categoryNameRegexp,
        message = "Category alias must contain only allowed characters"
    )
    val alias: String
)
