package com.jetbrains.life_science.container.approach.repository

import com.jetbrains.life_science.container.approach.entity.PublicApproach
import com.jetbrains.life_science.section.entity.Section
import com.jetbrains.life_science.user.credentials.entity.Credentials
import org.springframework.data.jpa.repository.JpaRepository

interface PublicApproachRepository : JpaRepository<PublicApproach, Long> {
    fun existsByIdAndSectionsContains(id: Long, section: Section): Boolean
    fun existsByIdAndCoAuthorsContains(id: Long, coAuthor: Credentials): Boolean
    fun getAllByOwnerId(ownerId: Long): List<PublicApproach>
}
