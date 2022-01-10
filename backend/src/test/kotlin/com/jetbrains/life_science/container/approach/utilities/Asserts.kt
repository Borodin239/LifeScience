package com.jetbrains.life_science.container.approach.utilities

import com.jetbrains.life_science.container.approach.entity.Approach
import org.junit.jupiter.api.Assertions

fun assertContainsSection(approach: Approach, sectionId: Long) {
    Assertions.assertTrue(approach.sections.any { it.id == sectionId })
}

fun assertNotContainsSection(approach: Approach, sectionId: Long) {
    Assertions.assertFalse(approach.sections.any { it.id == sectionId })
}

fun assertContainsCategory(approach: Approach, categoryId: Long) {
    Assertions.assertTrue(approach.categories.any { it.id == categoryId })
}
