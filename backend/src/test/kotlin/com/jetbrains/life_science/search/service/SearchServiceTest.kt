package com.jetbrains.life_science.search.service

import com.jetbrains.life_science.category.search.PathUnit
import com.jetbrains.life_science.search.query.SearchUnitType
import com.jetbrains.life_science.search.result.approach.ApproachSearchResult
import com.jetbrains.life_science.search.result.category.CategorySearchResult
import com.jetbrains.life_science.search.result.protocol.ProtocolSearchResult
import com.jetbrains.life_science.search.service.maker.makeSearchQueryInfo
import com.jetbrains.life_science.util.populator.ElasticPopulator
import org.elasticsearch.client.RestHighLevelClient
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.jdbc.Sql
import org.springframework.transaction.annotation.Transactional
import javax.annotation.PostConstruct

@SpringBootTest
@Sql(
    "/scripts/initial_data.sql",
    "/scripts/search/search_data.sql"
)
@Transactional
internal class SearchServiceTest {

    @Autowired
    lateinit var service: SearchService

    @Autowired
    lateinit var highLevelClient: RestHighLevelClient

    lateinit var elasticPopulator: ElasticPopulator

    @PostConstruct
    fun setup() {
        elasticPopulator = ElasticPopulator(highLevelClient).apply {
            addPopulator("category", "elastic/category.json")
            addPopulator("content", "elastic/content.json")
            addPopulator("approach", "elastic/approach.json")
            addPopulator("protocol", "elastic/protocol.json")
        }
    }

    @BeforeEach
    fun resetElastic() {
        elasticPopulator.prepareData()
    }

    /**
     * Should find expected categories
     */
    @Test
    fun `categories search`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "alpha beta catalog",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            CategorySearchResult(
                categoryId = 3, name = "catalog",
                listOf(
                    listOf(
                        PathUnit(1, "root")
                    )
                )
            ),
            CategorySearchResult(
                categoryId = 4, name = "catalog",
                listOf(
                    listOf(
                        PathUnit(1, "root"),
                        PathUnit(2, "catalog 2")
                    )
                )
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected approaches
     */
    @Test
    fun `approaches search`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "catalog three",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            ApproachSearchResult(publishApproachId = 3, approachName = "approach three"),
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected protocols
     */
    @Test
    fun `protocols search`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "zeta",
            includeTypes = listOf(SearchUnitType.PROTOCOL),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            ProtocolSearchResult(publishProtocolId = 1, approachId = 1, name = "omega zeta"),
            ProtocolSearchResult(publishProtocolId = 2, approachId = 1, name = "zeta bi two")
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected content, category and approach
     */
    @Test
    fun `combined search`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "one",
            includeTypes = listOf(SearchUnitType.APPROACH, SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            CategorySearchResult(
                categoryId = 2,
                name = "catalog 1",
                paths = listOf(
                    emptyList()
                )
            ),
            ApproachSearchResult(
                publishApproachId = 1,
                approachName = "approach one"
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected approaches
     */
    @Test
    fun `search for approaches in several categories 1`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "peptides and proteins analysis qualitative qualitative",
            includeTypes = listOf(SearchUnitType.APPROACH, SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            ApproachSearchResult(
                publishApproachId = 7,
                approachName = "ELISA"
            ),
            ApproachSearchResult(
                publishApproachId = 6,
                approachName = "Western Blotting"
            ),
            // Possible misprint in words "qualitative"/"quantitative"
            ApproachSearchResult(
                publishApproachId = 4,
                approachName = "SDS-Page"
            ),
            ApproachSearchResult(
                publishApproachId = 5,
                approachName = "Native Page"
            ),
            ApproachSearchResult(
                publishApproachId = 8,
                approachName = "Bradford"
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected approaches
     */
    @Test
    fun `search for approaches in several categories 2`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "qualitative analysis nucleic acids",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            ApproachSearchResult(
                publishApproachId = 9,
                approachName = "Southern Blotting"
            ),
            ApproachSearchResult(
                publishApproachId = 10,
                approachName = "Quantitative real time PCR"
            ),
            ApproachSearchResult(
                publishApproachId = 13,
                approachName = "Real-Time PCR"
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected approaches
     */
    @Test
    fun `search with preposition 1`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "quantitative analysis of proteins",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            ApproachSearchResult(
                publishApproachId = 7,
                approachName = "ELISA"
            ),
            ApproachSearchResult(
                publishApproachId = 6,
                approachName = "Western Blotting"
            ),
            ApproachSearchResult(
                publishApproachId = 8,
                approachName = "Bradford"
            ),
            // Possible misprint in words "qualitative"/"quantitative"
            ApproachSearchResult(
                publishApproachId = 4,
                approachName = "SDS-Page"
            ),
            ApproachSearchResult(
                publishApproachId = 5,
                approachName = "Native Page"
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected approaches
     */
    @Test
    fun `search with preposition 2`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "an analysis of nucleic acids",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            ApproachSearchResult(
                publishApproachId = 13,
                approachName = "Real-Time PCR"
            ),
            ApproachSearchResult(
                publishApproachId = 9,
                approachName = "Southern Blotting"
            ),
            ApproachSearchResult(
                publishApproachId = 10,
                approachName = "Quantitative real time PCR"
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected categories with fuzzy request
     */
    @Test
    fun `fuzzy search`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "alphas teta catalocs",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            CategorySearchResult(
                categoryId = 3, name = "catalog",
                paths = listOf(
                    listOf(
                        PathUnit(1, "root")
                    )
                )
            ),
            CategorySearchResult(
                categoryId = 4, name = "catalog",
                paths = listOf(
                    listOf(
                        PathUnit(1, "root"),
                        PathUnit(2, "catalog 2")
                    )
                )
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected categories with different letter cases request
     */
    @Test
    fun `uppercase test`() {
        // Prepare
        val searchQueryInfoLowercase = makeSearchQueryInfo(
            text = "fplc",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val searchQueryInfoUppercase = makeSearchQueryInfo(
            text = "FPLC",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val searchQueryInfoLowercaseFuzzy = makeSearchQueryInfo(
            text = "flpc",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val searchQueryInfoUppercaseFuzzy = makeSearchQueryInfo(
            text = "FLPC",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val searchQueryInfoMixedCase = makeSearchQueryInfo(
            text = "FpLc",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )

        val expectedResults = listOf(
            CategorySearchResult(
                categoryId = 1, name = "root",
                paths = listOf(emptyList())
            )
        )

        // Action
        val searchResultLowercase = service.search(searchQueryInfoLowercase)
        val searchResultUppercase = service.search(searchQueryInfoUppercase)
        val searchResultLowercaseFuzzy = service.search(searchQueryInfoLowercaseFuzzy)
        val searchResultUppercaseFuzzy = service.search(searchQueryInfoUppercaseFuzzy)
        val searchResultMix = service.search(searchQueryInfoMixedCase)

        // Assert
        assertEquals(expectedResults, searchResultLowercase)
        assertEquals(expectedResults, searchResultUppercase)
        assertEquals(expectedResults, searchResultLowercaseFuzzy)
        assertEquals(expectedResults, searchResultUppercaseFuzzy)
        assertEquals(expectedResults, searchResultMix)
    }

    /**
     * Should find expected approaches
     */
    @Test
    fun `dash search 1`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "sds-Page",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            ApproachSearchResult(
                publishApproachId = 4,
                approachName = "SDS-Page"
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    /**
     * Should find expected approaches
     */
    @Test
    fun `dash search 2`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "real time",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = listOf(
            ApproachSearchResult(
                publishApproachId = 13,
                approachName = "Real-Time PCR"
            ),
            ApproachSearchResult(
                publishApproachId = 10,
                approachName = "Quantitative real time PCR"
            )
        )

        // Action
        val searchResult = service.search(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchResult)
    }

    @Test
    fun `simple suggest query test`() {
        // Prepare data
        val searchQueryInfo = makeSearchQueryInfo(
            text = "cat",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val expectedResults = setOf("catalog 1", "catalog", "catalog 2", "catalog one")

        // Action
        val result = service.suggest(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, result.buckets.map { it.key }.toSet())
    }

    @Test
    fun `uppercase suggest query test`() {
        // Prepare data
        val upperCaseSearchQueryInfo = makeSearchQueryInfo(
            text = "CAT",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 10
        )
        val mixedCaseSearchQueryInfo = makeSearchQueryInfo(
            text = "cAtaL",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 10
        )
        val expectedResults = setOf("catalog", "catalog 1", "catalog 2", "catalog one")

        // Action
        val searchUpperCaseResult = service.suggest(upperCaseSearchQueryInfo)
        val searchMixedCaseResult = service.suggest(mixedCaseSearchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchUpperCaseResult.buckets.map { it.key }.toSet())
        assertEquals(expectedResults, searchMixedCaseResult.buckets.map { it.key }.toSet())
    }

    @Test
    fun `multiple words suggestion test 1`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "real t",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = setOf("Quantitative real time PCR", "Real-Time PCR")

        // Action
        val searchLowerCaseResult = service.suggest(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchLowerCaseResult.buckets.map { it.key }.toSet())
    }

    @Test
    fun `multiple words suggestion test 2`() {
        // Prepare
        val searchQueryInfo = makeSearchQueryInfo(
            text = "rea ti PC",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = setOf("Quantitative real time PCR", "Real-Time PCR")

        // Action
        val searchLowerCaseResult = service.suggest(searchQueryInfo)

        // Assert
        assertEquals(expectedResults, searchLowerCaseResult.buckets.map { it.key }.toSet())
    }

    @Test
    fun `dash suggestion test 1`() {
        // Prepare
        val dashSearchQueryInfo = makeSearchQueryInfo(
            text = "real-time",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )
        val whiteSpaceSearchQueryInfo = makeSearchQueryInfo(
            text = "real time",
            includeTypes = listOf(SearchUnitType.CATEGORY),
            from = 0,
            size = 100
        )

        // Action
        val dashSearchResult = service.suggest(dashSearchQueryInfo)
        val whiteSpaceSearchResult = service.suggest(whiteSpaceSearchQueryInfo)

        // Assert
        assertEquals(
            dashSearchResult.buckets.map { it.key },
            whiteSpaceSearchResult.buckets.map { it.key }
        )
    }

    @Test
    fun `dash suggestion test 2`() {
        // Prepare
        val dashSearchQueryInfo = makeSearchQueryInfo(
            text = "sds-pa",
            includeTypes = listOf(SearchUnitType.APPROACH),
            from = 0,
            size = 100
        )
        val expectedResults = listOf("SDS-Page")

        // Action
        val dashSearchResult = service.suggest(dashSearchQueryInfo)

        // Assert
        assertEquals(expectedResults, dashSearchResult.buckets.map { it.key })
    }
}
