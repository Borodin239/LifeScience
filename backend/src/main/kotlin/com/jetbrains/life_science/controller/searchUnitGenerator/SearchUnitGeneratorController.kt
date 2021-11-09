package com.jetbrains.life_science.controller.searchUnitGenerator

import com.jetbrains.life_science.util.category_search_unit_generator.CategorySearchUnitGenerator
import io.swagger.v3.oas.annotations.Operation
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/generator")
class SearchUnitGeneratorController(
    val categorySearchUnitGenerator: CategorySearchUnitGenerator
) {

    @Operation(summary = "Deprecated: Generates search units for all categories")
    @PatchMapping("/category")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun generateCategoriesSearchUnits() {
        categorySearchUnitGenerator.generate()
    }
}
