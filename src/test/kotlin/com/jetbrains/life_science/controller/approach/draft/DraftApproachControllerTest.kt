package com.jetbrains.life_science.controller.approach.draft

import com.jetbrains.life_science.ApiTest
import com.jetbrains.life_science.controller.approach.draft.dto.DraftApproachAddParticipantDTO
import com.jetbrains.life_science.controller.approach.draft.dto.DraftApproachCreationDTO
import com.jetbrains.life_science.controller.approach.draft.view.DraftApproachView
import com.jetbrains.life_science.controller.category.view.CategoryShortView
import com.jetbrains.life_science.controller.user.view.UserShortView
import com.jetbrains.life_science.review.request.repository.PublishApproachRequestRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.jdbc.Sql
import java.time.LocalDateTime

@Sql(
    "/scripts/initial_data.sql",
    "/scripts/section/section_data.sql",
    "/scripts/approach/draft_approach_data.sql"
)
internal class DraftApproachControllerTest : ApiTest() {

    private val path = "/api/approaches/draft"

    @Autowired
    lateinit var publishApproachRequestRepository: PublishApproachRequestRepository

    /**
     * Test should return draft approach view
     */
    @Test
    fun `get draft approach test`() {
        val loginAccessToken = loginAccessToken("email@email.ru", "password")
        val expectedView = DraftApproachView(
            id = 1,
            name = "approach 1",
            categories = listOf(
                CategoryShortView(1, "catalog 1", timeOf(2020, 9, 17)),
                CategoryShortView(2, "catalog 2", timeOf(2020, 10, 17))
            ),
            sections = emptyList(),
            participants = listOf(
                UserShortView(id = 1, fullName = "Alex"),
                UserShortView(id = 4, fullName = "Regular")
            )
        )

        val approach = getViewAuthorized<DraftApproachView>(makePath(1), loginAccessToken)

        assertEquals(expectedView, approach)
    }

    /**
     * Should return ApiExceptionView
     *
     * Expected 404 http code and 404_003 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `get not existent approach test`() {
        val loginAccessToken = loginAccessToken("email@email.ru", "password")
        val request = getAuthorized(makePath(199), loginAccessToken)

        val exceptionView = getApiExceptionView(404, request)

        assertEquals(404_003, exceptionView.systemCode)
        assertTrue(exceptionView.arguments.isEmpty())
    }

    /**
     * Test check method creation
     */
    @Test
    fun `create method with base sections test`() {
        val loginAccessToken = loginAccessToken("email@email.ru", "password")
        val dto = DraftApproachCreationDTO(
            name = "approach Z",
            initialCategoryId = 1
        )

        val created = postAuthorized<DraftApproachView>(path, dto, loginAccessToken)
        val approach = getViewAuthorized<DraftApproachView>(makePath(created.id), loginAccessToken)

        val expectedView = DraftApproachView(
            id = approach.id,
            name = "approach Z",
            categories = listOf(
                CategoryShortView(id = 1, name = "catalog 1", creationDate = timeOf(2020, 9, 17))
            ),
            sections = listOf(),
            participants = listOf(UserShortView(id = 1, fullName = "Alex"))
        )

        assertEquals(expectedView, approach)
    }

    /**
     * Test checks exception on attempt to create approach with wrong category id
     *
     * Expected 404 http code and 404_001 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `create method with wrong initial parent category id`() {
        val loginAccessToken = loginAccessToken("email@email.ru", "password")
        val dto = DraftApproachCreationDTO(
            name = "approach Z",
            initialCategoryId = 199
        )
        val request = postRequestAuthorized(path, dto, loginAccessToken)

        val exceptionView = getApiExceptionView(404, request)

        assertEquals(404_001, exceptionView.systemCode)
        assertEquals(listOf(listOf("199")), exceptionView.arguments)
    }

    /**
     * Тест checks failure when creating section by regular user
     *
     * Expected 403 http code and 403_001 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `create method by regular user failure test`() {
        val loginAccessToken = loginAccessToken("email@email.ru", "password")
        val dto = DraftApproachCreationDTO(
            name = "approach Z",
            initialCategoryId = 199
        )
        val request = postRequestAuthorized(path, dto, loginAccessToken)

        val exceptionView = getApiExceptionView(404, request)

        assertEquals(404_001, exceptionView.systemCode)
        assertEquals(listOf(listOf("199")), exceptionView.arguments)
    }

    /**
     * Test checks sending to publication draft approach
     */
    @Test
    fun `send to publication test`() {
        val loginAccessToken = loginAccessToken("email@email.ru", "password")
        patchAuthorized(makePath("1/send"), loginAccessToken)

        val request = publishApproachRequestRepository.findAll().filter { it.approach.id == 1L }
        assertTrue(request.size == 1)
    }

    /**
     * Test checks reject to publication by other user
     *
     * Expected 403 http code and 403_000 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `send to publication by regular user`() {
        val loginAccessToken = loginAccessToken("simple@gmail.ru", "user123")
        val request = patchRequestAuthorized(makePath("1/send"), loginAccessToken)

        val exceptionView = getApiExceptionView(403, request)

        assertEquals(403_000, exceptionView.systemCode)
    }

    /**
     * Test checks reject to publication by anonymous user
     *
     * Expected 403 http code and 403_000 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `send to publication by anonymous user`() {
        val request = patchRequest(makePath("1/send"))

        val exceptionView = getApiExceptionView(403, request)

        assertEquals(403_000, exceptionView.systemCode)
    }

    /**
     * Test checks user addition to participants
     */
    @Test
    fun `add participant test`() {
        val loginAccessToken = loginAccessToken("email@email.ru", "password")
        val dto = DraftApproachAddParticipantDTO("admin@gmail.ru")

        postRequestAuthorized(makePath("1/participants"), dto, loginAccessToken)
        val approach = getViewAuthorized<DraftApproachView>(makePath(1), loginAccessToken)

        val expectedView = DraftApproachView(
            id = 1,
            name = "approach 1",
            categories = listOf(
                CategoryShortView(1, "catalog 1", timeOf(2020, 9, 17)),
                CategoryShortView(2, "catalog 2", timeOf(2020, 10, 17))
            ),
            sections = emptyList(),
            participants = listOf(
                UserShortView(id = 1, fullName = "Alex"),
                UserShortView(id = 4, fullName = "Regular"),
                UserShortView(id = 2, fullName = "Ben")
            )
        )
        assertEquals(expectedView, approach)
    }

    /**
     * Test checks reject add to participants by other user
     *
     * Expected 403 http code and 403_000 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `add to participants by regular user`() {
        val loginAccessToken = loginAccessToken("simple@gmail.ru", "user123")
        val dto = DraftApproachAddParticipantDTO("admin@gmail.ru")

        val request = postRequestAuthorized(makePath("1/participants"), dto, loginAccessToken)

        val exceptionView = getApiExceptionView(403, request)

        assertEquals(403_000, exceptionView.systemCode)
    }

    /**
     * Test checks reject add to participants by anonymous user
     *
     * Expected 403 http code and 403_000 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `add to participants by anonymous user`() {
        val dto = DraftApproachAddParticipantDTO("email3@email.ru")

        val request = postRequest(makePath("1/participants"), dto)

        val exceptionView = getApiExceptionView(403, request)

        assertEquals(403_000, exceptionView.systemCode)
    }

    /**
     * Test checks remove from participants
     */
    @Test
    fun `delete participant test`() {
        `add participant test`()

        val loginAccessToken = loginAccessToken("email@email.ru", "password")

        deleteAuthorized(makePath("1/participants/2"), loginAccessToken)
        val approach = getViewAuthorized<DraftApproachView>(makePath(1), loginAccessToken)

        val expectedView = DraftApproachView(
            id = 1,
            name = "approach 1",
            categories = listOf(
                CategoryShortView(1, "catalog 1", timeOf(2020, 9, 17)),
                CategoryShortView(2, "catalog 2", timeOf(2020, 10, 17))
            ),
            sections = emptyList(),
            participants = listOf(
                UserShortView(id = 1, fullName = "Alex"),
                UserShortView(id = 4, fullName = "Regular")
            )
        )
        assertEquals(expectedView, approach)
    }

    /**
     * Test checks reject delete from participants by regular user
     *
     * Expected 403 http code and 403_000 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `delete participant by regular user test`() {
        val loginAccessToken = loginAccessToken("simple@gmail.ru", "user123")

        val request = deleteRequestAuthorized(makePath("1/participants/2"), loginAccessToken)

        val exceptionView = getApiExceptionView(403, request)

        assertEquals(403_000, exceptionView.systemCode)
    }

    /**
     * Test checks reject delete from participants by anonymous user
     *
     * Expected 403 http code and 403_000 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `delete participant by anonymous user test`() {
        val request = deleteRequest(makePath("1/participants/2"))

        val exceptionView = getApiExceptionView(403, request)

        assertEquals(403_000, exceptionView.systemCode)
    }

    private fun makePath(addition: Any): String {
        return "$path/$addition"
    }

    fun timeOf(year: Int, month: Int, day: Int): LocalDateTime {
        return LocalDateTime.of(year, month, day, 0, 0, 0)
    }
}