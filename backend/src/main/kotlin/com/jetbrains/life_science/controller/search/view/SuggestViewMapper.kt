package com.jetbrains.life_science.controller.search.view

import org.elasticsearch.search.aggregations.bucket.terms.Terms
import org.springframework.stereotype.Component

@Component
class SuggestViewMapper {

    fun toViews(terms: Terms): List<SuggestView> {
        return terms.buckets.map {
            toView(it)
        }
    }

    fun toView(bucket: Terms.Bucket): SuggestView {
        return SuggestView(
            name = bucket.keyAsString
        )
    }
}
