package com.jetbrains.life_science.article.service

import com.jetbrains.life_science.article.entity.Article
import com.jetbrains.life_science.container.entity.Container

interface ArticleService {

    fun create(info: ArticleInfo)

    fun updateText(id: String, text: String)

    fun delete(id: String)

    fun deleteByContainerId(containerId: Long)

    fun findAllByContainerId(containerId: Long): List<Article>

    fun createCopiesByContainer(origin: Container, copy: Container)
}
