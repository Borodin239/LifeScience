package com.jetbrains.life_science.search.result.approach

import com.jetbrains.life_science.search.query.SearchUnitType
import com.jetbrains.life_science.search.result.SuggestResult

data class ApproachSearchResult(
    val publishApproachId: Long,
    val approachName: String
) : SuggestResult(name = approachName, typeName = SearchUnitType.APPROACH.presentationName)
