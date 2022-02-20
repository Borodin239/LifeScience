package com.jetbrains.life_science.search.result.category

import com.jetbrains.life_science.search.result.UnitSearchService
import com.jetbrains.life_science.util.getOrThrow
import org.springframework.stereotype.Service

@Service
class LightCategorySearchService : UnitSearchService {

    override fun process(id: String, response: Map<String, Any>): LightCategorySearchResult {
        @Suppress("UNCHECKED_CAST")
        // Because we trust in fact that elastic stores everything right
        val names = response.getOrThrow("names") { "Names not found" } as List<String>

        return LightCategorySearchResult(names[0])
    }

    override val key = "LightCategory"
}
