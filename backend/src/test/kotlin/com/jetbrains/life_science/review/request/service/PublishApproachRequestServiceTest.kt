package com.jetbrains.life_science.review.request.service

import com.jetbrains.life_science.approach.entity.DraftApproach
import com.jetbrains.life_science.exception.not_found.PublishApproachRequestNotFoundException
import com.jetbrains.life_science.exception.request.RequestImmutableStateException
import com.jetbrains.life_science.review.request.entity.RequestState
import com.jetbrains.life_science.review.request.service.maker.makePublishApproachRequest
import com.jetbrains.life_science.user.credentials.entity.Credentials
import com.jetbrains.life_science.user.credentials.service.CredentialsService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.jdbc.Sql
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@SpringBootTest
@Sql("/scripts/users_data.sql", "/scripts/publish_approach_request_data.sql")
@Transactional
class PublishApproachRequestServiceTest {

    @Autowired
    lateinit var service: PublishApproachRequestService

    @Autowired
    lateinit var credentialsService: CredentialsService

    /**
     * Should return existing publish approach request
     */
    @Test
    fun `get existing publish approach request`() {
        // Prepare data
        val expectedId = 1L
        val expectedApproachId = 1L
        val expectedState = RequestState.PENDING
        val expectedEditorId = 1L

        // Action
        val publishApproachRequest = service.get(expectedId)

        // Assert
        assertEquals(publishApproachRequest.id, expectedId)
        assertEquals(publishApproachRequest.approach.id, expectedApproachId)
        assertEquals(publishApproachRequest.state, expectedState)
        assertEquals(publishApproachRequest.editor.id, expectedEditorId)
    }

    /**
     * Should throw PublishApproachRequestNotFoundException
     */
    @Test
    fun `get non-existing publish approach request`() {
        // Prepare data
        val expectedId = 239L

        // Action & Assert
        assertThrows<PublishApproachRequestNotFoundException> {
            service.get(expectedId)
        }
    }

    /**
     * Should create new publish approach request
     */
    @Test
    fun `create new publish approach request`() {
        // Prepare data
        val approachOwner = credentialsService.getById(1L)
        val editor = credentialsService.getById(3L)
        val approach = createDraftApproach(1L, "first approach", approachOwner)
        val creationLocalDateTime = LocalDateTime.of(2021, 5, 21, 12, 53, 47)
        val info = makePublishApproachRequest(
            id = 0L,
            date = creationLocalDateTime,
            editor = editor,
            approach = approach
        )
        val expectedState = RequestState.PENDING

        // Action
        service.create(info)
        val publishApproachRequest = service.get(info.id)

        // Assert
        assertEquals(info.id, publishApproachRequest.id)
        assertEquals(editor.id, publishApproachRequest.editor.id)
        assertEquals(approach.id, publishApproachRequest.approach.id)
        assertEquals(expectedState, publishApproachRequest.state)
    }

    /**
     * Should approve existing publish approach request
     */
    @Test
    fun `approve existing pending publish approach request`() {
        // Prepare data
        val publishApproachId = 1L

        // Action
        val prevPublishApproachRequest = service.get(publishApproachId)
        service.approve(publishApproachId)
        val publishApproachRequest = service.get(publishApproachId)

        // Assert
        assertEquals(prevPublishApproachRequest.id, publishApproachRequest.id)
        assertEquals(prevPublishApproachRequest.editor.id, publishApproachRequest.editor.id)
        assertEquals(prevPublishApproachRequest.approach.id, publishApproachRequest.approach.id)
        assertEquals(prevPublishApproachRequest.date, publishApproachRequest.date)
        assertEquals(RequestState.APPROVED, publishApproachRequest.state)
    }

    /**
     * Should throw PublishApproachRequestNotFoundException
     */
    @Test
    fun `approve non-existing publish approach request`() {
        // Prepare data
        val publishApproachId = 239L

        // Action & Assert
        assertThrows<PublishApproachRequestNotFoundException> {
            service.approve(publishApproachId)
        }
    }

    /**
     * Should throw RequestImmutableStateException
     */
    @Test
    fun `approve existing publish approach request with approved or canceled state`() {
        // Prepare data
        val canceledPublishApproachId = 2L
        val approvedPublishApproachId = 3L

        // Action & Assert
        assertThrows<RequestImmutableStateException> {
            service.approve(canceledPublishApproachId)
        }
        assertThrows<RequestImmutableStateException> {
            service.approve(approvedPublishApproachId)
        }
    }

    /**
     * Should cancel existing publish approach request
     */
    @Test
    fun `cancel existing pending publish approach request`() {
        // Prepare data
        val publishApproachId = 1L

        // Action
        val prevPublishApproachRequest = service.get(publishApproachId)
        service.cancel(publishApproachId)
        val publishApproachRequest = service.get(publishApproachId)

        // Assert
        assertEquals(prevPublishApproachRequest.id, publishApproachRequest.id)
        assertEquals(prevPublishApproachRequest.editor.id, publishApproachRequest.editor.id)
        assertEquals(prevPublishApproachRequest.approach.id, publishApproachRequest.approach.id)
        assertEquals(prevPublishApproachRequest.date, publishApproachRequest.date)
        assertEquals(RequestState.CANCELED, publishApproachRequest.state)
    }

    /**
     * Should throw PublishApproachRequestNotFoundException
     */
    @Test
    fun `cancel non-existing publish approach request`() {
        // Prepare data
        val publishApproachId = 239L

        // Action & Assert
        assertThrows<PublishApproachRequestNotFoundException> {
            service.cancel(publishApproachId)
        }
    }

    /**
     * Should throw RequestImmutableStateException
     */
    @Test
    fun `cancel existing publish approach request with approved or canceled state`() {
        // Prepare data
        val canceledPublishApproachId = 2L
        val approvedPublishApproachId = 3L

        // Action & Assert
        assertThrows<RequestImmutableStateException> {
            service.cancel(canceledPublishApproachId)
        }
        assertThrows<RequestImmutableStateException> {
            service.cancel(approvedPublishApproachId)
        }
    }

    private fun createDraftApproach(id: Long, name: String, owner: Credentials) =
        DraftApproach(
            id = id,
            name = name,
            owner = owner,
            tags = mutableListOf(),
            sections = mutableListOf(),
            categories = mutableListOf(),
            creationDate = LocalDateTime.now(),
            participants = mutableListOf(owner)
        )
}
