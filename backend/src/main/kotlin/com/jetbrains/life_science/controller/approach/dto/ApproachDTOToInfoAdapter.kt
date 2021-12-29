package com.jetbrains.life_science.controller.approach.dto

import com.jetbrains.life_science.category.entity.Category
import com.jetbrains.life_science.container.approach.service.ApproachInfo
import com.jetbrains.life_science.user.credentials.entity.Credentials

class ApproachDTOToInfoAdapter(
    dto: ApproachDTO,
    initialCategory: Category,
    override val owner: Credentials
) : ApproachInfo {
    override val id: Long = 0
    override val name: String = dto.name
    override val aliases: List<String> = mutableListOf()
    override val categories: List<Category> = listOf(initialCategory)
    override val tags: List<String> = listOf()
}
