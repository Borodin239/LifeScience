package com.jetbrains.life_science.container.approach.service

import com.jetbrains.life_science.container.ContainsSections
import com.jetbrains.life_science.container.approach.entity.DraftApproach
import com.jetbrains.life_science.container.approach.entity.PublicApproach
import com.jetbrains.life_science.section.entity.Section
import com.jetbrains.life_science.user.credentials.entity.Credentials

interface PublicApproachService : ContainsSections {
    fun get(id: Long): PublicApproach

    fun create(info: ApproachInfo): PublicApproach

    fun create(approach: DraftApproach): PublicApproach

    fun delete(id: Long)

    fun getAllByOwnerId(ownerId: Long): List<PublicApproach>

    fun hasCoAuthor(id: Long, user: Credentials): Boolean

    override fun addSection(id: Long, section: Section)

    override fun removeSection(id: Long, section: Section)
}
