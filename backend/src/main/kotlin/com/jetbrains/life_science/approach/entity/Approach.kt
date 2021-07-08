package com.jetbrains.life_science.approach.entity

import com.jetbrains.life_science.section.entity.Section
import com.jetbrains.life_science.user.credentials.entity.Credentials
import javax.persistence.*

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
abstract class Approach(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Long,

    var name: String,

    @OneToMany
    var sections: MutableList<Section>,

    @ElementCollection
    var tags: List<String>,

    @OneToOne
    var owner: Credentials
)
