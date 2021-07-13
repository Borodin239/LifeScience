package com.jetbrains.life_science.approach.entity

import com.jetbrains.life_science.category.entity.Category
import com.jetbrains.life_science.section.entity.Section
import com.jetbrains.life_science.user.credentials.entity.Credentials
import java.time.LocalDateTime
import javax.persistence.*

@Entity
class DraftApproach(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    override val id: Long,

    name: String,
    sections: MutableList<Section>,
    tags: MutableList<String>,
    owner: Credentials,
    categories: MutableList<Category>,
    creationDate: LocalDateTime,

    @ManyToMany
    var participants: MutableList<Credentials>

) : Approach(name, sections, categories, tags, owner, creationDate)
