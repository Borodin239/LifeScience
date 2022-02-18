package com.jetbrains.life_science.search.result.approach

import com.jetbrains.life_science.search.query.SearchUnitType
import com.jetbrains.life_science.search.result.SearchResult

data class ApproachSearchResult(
    val publicApproachId: Long,
    val name: String
) : SearchResult {
    override val typeName = SearchUnitType.APPROACH.presentationName
}
