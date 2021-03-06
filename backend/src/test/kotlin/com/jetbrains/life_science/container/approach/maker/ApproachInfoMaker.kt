package com.jetbrains.life_science.container.approach.maker

import com.jetbrains.life_science.category.entity.Category
import com.jetbrains.life_science.container.approach.service.ApproachInfo
import com.jetbrains.life_science.user.credentials.entity.Credentials

fun makeApproachInfo(
    id: Long,
    name: String,
    aliases: List<String>,
    tags: List<String>,
    categories: List<Category>,
    owner: Credentials
): ApproachInfo = object : ApproachInfo {
    override val id = id
    override val aliases = aliases
    override val name = name
    override val tags = tags
    override val categories = categories
    override val owner = owner
}
