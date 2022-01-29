package com.jetbrains.life_science.search.result.category

import com.jetbrains.life_science.search.query.SearchUnitType
import com.jetbrains.life_science.search.result.SuggestResult

class LightCategorySearchResult(categoryName: String) : SuggestResult(
    name = categoryName,
    typeName = SearchUnitType.CATEGORY.presentationName
)
