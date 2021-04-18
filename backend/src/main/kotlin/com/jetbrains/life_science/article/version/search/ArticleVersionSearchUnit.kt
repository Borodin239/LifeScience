package com.jetbrains.life_science.article.version.search

import org.springframework.data.annotation.TypeAlias
import org.springframework.data.elasticsearch.annotations.Document
import javax.persistence.Id

@Document(indexName = "article", createIndex = true)
@TypeAlias("Article")
class ArticleVersionSearchUnit(

    @Id
    val id: Long,

    val name: String

)