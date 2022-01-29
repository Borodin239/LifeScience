package com.jetbrains.life_science.search.result.protocol

import com.jetbrains.life_science.search.query.SearchUnitType
import com.jetbrains.life_science.search.result.SearchResult

data class ProtocolSearchResult(
    val publishProtocolId: Long,
    val approachId: Long,
    val name: String
) : SearchResult {
    override val typeName = SearchUnitType.PROTOCOL.presentationName
}
