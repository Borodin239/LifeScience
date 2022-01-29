package com.jetbrains.life_science.search.result

abstract class SuggestResult(
    val name: String,
    override val typeName: String
) : SearchResult
