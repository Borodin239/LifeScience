package com.jetbrains.life_science.search.result

interface UnitSearchService {

    fun process(id: String, response: Map<String, Any>): SearchResult

    val key: String
}
