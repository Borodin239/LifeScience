package com.jetbrains.life_science.controller.approach.published

import com.jetbrains.life_science.ApiTest
import com.jetbrains.life_science.controller.approach.dto.ApproachDTO
import com.jetbrains.life_science.controller.protocol.view.ProtocolShortView
import com.jetbrains.life_science.controller.approach.published.view.PublicApproachView
import com.jetbrains.life_science.controller.category.view.CategoryShortView
import com.jetbrains.life_science.controller.user.view.UserShortView
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.test.context.jdbc.Sql

@Sql(
    "/scripts/initial_data.sql",
    "/scripts/approach/public_approach_data.sql"
)
internal class PublicApproachControllerTest : ApiTest() {

    private val path = "/api/approaches/public"

    /**
     * Test should return public approach view
     */
    @Test
    fun `get public approach test`() {
        val expectedView = PublicApproachView(
            id = 1,
            name = "approach 1",
            categories = listOf(
                CategoryShortView(1, "catalog 1", timeOf(2020, 9, 17)),
            ),
            sections = emptyList(),
            coAuthors = listOf(
                UserShortView(id = 1, fullName = "Alex"),
                UserShortView(id = 2, fullName = "Ben")
            ),
            protocols = listOf(
                ProtocolShortView(id = 1, name = "first published")
            )
        )

        val approach = getView<PublicApproachView>(makePath(1))

        assertEquals(expectedView, approach)
    }

    /**
     * Should return 404_003 code
     */
    @Test
    fun `get not existent approach test`() {
        val request = getRequest(makePath(199))

        val exceptionView = getApiExceptionView(404, request)

        assertEquals(404_003, exceptionView.systemCode)
        assertTrue(exceptionView.arguments.isEmpty())
    }

    /**
     * Should return 404_003 code
     */
    @Test
    fun `create approach with base sections test`() {
        // Prepare data
        val loginAccessToken = loginAccessToken("admin@gmail.ru", "password")
        val dto = ApproachDTO(
            name = "approach test",
            initialCategoryId = 1
        )

        // Action
        val created = postAuthorized<PublicApproachView>(path, dto, loginAccessToken)
        val approach = getViewAuthorized<PublicApproachView>(makePath(created.id), loginAccessToken)

        // Prepare data
        val expectedView = PublicApproachView(
            id = approach.id,
            name = "approach test",
            categories = listOf(
                CategoryShortView(id = 1, name = "catalog 1", creationDate = timeOf(2020, 9, 17))
            ),
            sections = listOf(),
            coAuthors = listOf(UserShortView(id = 2, fullName = "Ben")),
            protocols = listOf()
        )

        // Assert
        assertEquals(expectedView, approach)
    }

    /**
     * Test checks exception on attempt to create public approach with wrong category id
     *
     * Expected 404 http code and 404_001 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `create approach with wrong initial parent category id`() {
        val loginAccessToken = loginAccessToken("admin@gmail.ru", "password")
        val dto = ApproachDTO(
            name = "approach test",
            initialCategoryId = 239
        )
        val request = postRequestAuthorized(path, dto, loginAccessToken)

        val exceptionView = getApiExceptionView(404, request)

        assertEquals(404_001, exceptionView.systemCode)
        assertEquals(listOf(listOf("239")), exceptionView.arguments)
    }

    /**
     * Тест checks failure when creating section by regular user
     *
     * Expected 403 http code and 403_001 system code result
     * with requested category id in view arguments.
     */
    @Test
    fun `create public approach by regular user failure test`() {
        // Prepare data
        val loginAccessToken = loginAccessToken("email@email.ru", "password")
        val dto = ApproachDTO(
            name = "approach test",
            initialCategoryId = 1
        )
        val request = postRequestAuthorized(path, dto, loginAccessToken)

        // Action
        val exceptionView = getApiExceptionView(403, request)

        // Assert
        assertEquals(403_000, exceptionView.systemCode)
        assertTrue(exceptionView.arguments.isEmpty())
    }

    private fun makePath(addition: Any): String {
        return "$path/$addition"
    }
}
