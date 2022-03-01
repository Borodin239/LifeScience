package com.jetbrains.life_science.container.approach.factory

import com.jetbrains.life_science.container.approach.entity.DraftApproach
import com.jetbrains.life_science.container.approach.entity.PublicApproach
import com.jetbrains.life_science.container.approach.service.ApproachInfo
import com.jetbrains.life_science.util.UTCZone
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class PublicApproachFactory {
    fun create(approach: DraftApproach): PublicApproach {
        return PublicApproach(
            id = 0,
            name = approach.name,
            aliases = approach.aliases.toMutableList(),
            sections = approach.sections.toMutableList(),
            tags = approach.tags.toMutableList(),
            owner = approach.owner,
            categories = approach.categories.toMutableList(),
            creationDate = approach.creationDate,
            coAuthors = approach.participants.toMutableList(),
            protocols = mutableListOf()
        )
    }

    fun create(info: ApproachInfo): PublicApproach {
        return PublicApproach(
            id = 0,
            name = info.name,
            aliases = info.aliases.toMutableList(),
            sections = mutableListOf(),
            tags = info.tags.toMutableList(),
            owner = info.owner,
            categories = info.categories.toMutableList(),
            creationDate = LocalDateTime.now(UTCZone),
            coAuthors = mutableListOf(info.owner),
            protocols = mutableListOf()
        )
    }
}
