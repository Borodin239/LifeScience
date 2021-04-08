package com.jetbrains.life_science.article.repository

import com.jetbrains.life_science.article.entity.Article
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository

@Repository
interface ArticleRepository : ElasticsearchRepository<Article, String>, ArticleRepositoryCustom {

    fun findAllByContainerId(containerId: Long): List<Article>

    fun deleteAllByContainerId(containerId: Long)
}