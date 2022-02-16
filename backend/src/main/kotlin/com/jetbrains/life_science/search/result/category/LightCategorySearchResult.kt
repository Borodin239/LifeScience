package com.jetbrains.life_science.search.result.category

import com.jetbrains.life_science.search.query.SearchUnitType
import com.jetbrains.life_science.search.result.SearchResult

data class LightCategorySearchResult(
    val categoryName: String
) : SearchResult {
    override val typeName = SearchUnitType.CATEGORY.presentationName
}
