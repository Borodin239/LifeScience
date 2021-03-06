package com.jetbrains.life_science.search.service

import com.jetbrains.life_science.container.approach.service.PublicApproachService
import com.jetbrains.life_science.exception.not_found.ApproachNotFoundException
import com.jetbrains.life_science.search.query.SearchQueryInfo
import com.jetbrains.life_science.search.query.SearchUnitType
import com.jetbrains.life_science.search.result.SearchResult
import com.jetbrains.life_science.search.result.UnitSearchService
import com.jetbrains.life_science.search.result.approach.ApproachSearchResult
import com.jetbrains.life_science.util.getLogger
import com.jetbrains.life_science.util.getOrThrow
import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.action.search.SearchResponse
import org.elasticsearch.client.RequestOptions
import org.elasticsearch.client.RestHighLevelClient
import org.elasticsearch.common.lucene.search.function.FunctionScoreQuery
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.index.query.functionscore.FunctionScoreQueryBuilder
import org.elasticsearch.search.SearchHit
import org.elasticsearch.search.builder.SearchSourceBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.lang.NumberFormatException

@Service
class SearchServiceImpl(
    val client: RestHighLevelClient
) : SearchService {
    val logger = getLogger()

    @Autowired
    lateinit var publicApproachService: PublicApproachService
    lateinit var searchUnitServices: Map<String, UnitSearchService>
    private val preposition = listOf("of", "as", "in", "on", "by", "to", "a", "the", "an")

    override val supportedTypes: List<SearchUnitType> = listOf(
        SearchUnitType.CATEGORY,
        SearchUnitType.APPROACH,
        SearchUnitType.PROTOCOL
    )

    @Autowired
    fun register(unitSearchService: List<UnitSearchService>) {
        searchUnitServices = unitSearchService.associateBy { service -> service.key }
    }

    override fun search(query: SearchQueryInfo): List<SearchResult> {
        try {
            val id = query.text.trim().toLong()
            return listOf(
                ApproachSearchResult(id, publicApproachService.get(id).name)
            )
        } catch (_: ApproachNotFoundException) {
            return listOf()
        } catch (_: NumberFormatException) {
        }
        val request = makeRequest(query)
        val response = getResponse(request)
        return processHits(response.hits.hits)
    }

    override fun suggest(query: SearchQueryInfo): List<SearchResult> {
        val request = makeSuggestRequest(query)
        val response = getResponse(request)
        return processHits(response.hits.distinctBy { it.sourceAsMap["names"] }.toTypedArray(), suggest = true)
    }

    private fun processHits(hits: Array<SearchHit>, suggest: Boolean = false) = hits
        .mapNotNull {
            processHit(it, suggest)
        }
        .sortedBy {
            SearchUnitType.valueOf(it.typeName.toUpperCase()).order
        }

    private fun makeSuggestRequest(query: SearchQueryInfo): SearchRequest {
        val tokens = getTokens(query)
        val queryBuilder = QueryBuilders.boolQuery().minimumShouldMatch(tokens.size)

        for (token in tokens) {
            queryBuilder.should(QueryBuilders.prefixQuery("names", token))
        }

        val searchBuilder = SearchSourceBuilder()
            .query(queryBuilder)
            .from(query.from)
            .size(query.size)

        return SearchRequest()
            .source(searchBuilder)
            .indices(*getRequestIndices(query))
    }

    private fun getResponse(request: SearchRequest): SearchResponse {
        return client.search(request, RequestOptions.DEFAULT)
    }

    private fun getQueryBuilder(
        token: String,
        name: String,
        boost: Float = 1.0F
    ): FunctionScoreQueryBuilder? {
        return QueryBuilders
            .functionScoreQuery(QueryBuilders.fuzzyQuery(name, token))
            .scoreMode(FunctionScoreQuery.ScoreMode.SUM).boost(boost)
    }

    private fun makeRequest(query: SearchQueryInfo): SearchRequest {
        val tokens = getTokens(query)
        val shouldContainsAllTokensQuery = QueryBuilders.boolQuery()

        for (token in tokens) {
            val minimalMatch = if (preposition.contains(token)) 1 else 2
            shouldContainsAllTokensQuery.must(
                QueryBuilders.boolQuery()
                    .minimumShouldMatch(minimalMatch)
                    .should(
                        getQueryBuilder(token, name = "context")
                    )
                    .should(
                        getQueryBuilder(token, name = "names", boost = 2F)
                    )
                    .should(QueryBuilders.matchAllQuery().boost(0F))
            )
        }

        val searchBuilder = SearchSourceBuilder()
            .query(shouldContainsAllTokensQuery)
            .minScore(0.1F)
            .sort("_score")
            .from(query.from)
            .size(query.size)

        return SearchRequest()
            .source(searchBuilder)
            .indices(*getRequestIndices(query))
    }

    private fun getTokens(query: SearchQueryInfo): List<String> {
        return query.text.trim().split("[\\s-,|]+".toRegex()).map { it.toLowerCase() }
    }

    private fun getRequestIndices(query: SearchQueryInfo) =
        query.includeTypes.map { it.indexName }.toTypedArray()

    private fun processHit(hit: SearchHit, suggest: Boolean): SearchResult? {
        try {
            val content: Map<String, Any> = hit.sourceAsMap
            val id = hit.id
            var type = content.getOrThrow("_class") { "Type not found at hit: $hit" }
            if (suggest && type == SearchUnitType.CATEGORY.presentationName) type = "Light$type"
            val service = searchUnitServices[type] ?: return null
            return service.process(id, content)
        } catch (e: Exception) {
            logger.error("Error in search service", e)
            return null
        }
    }
}
