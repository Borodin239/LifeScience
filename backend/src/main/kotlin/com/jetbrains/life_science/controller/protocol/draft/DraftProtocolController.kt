package com.jetbrains.life_science.controller.protocol.draft

import com.jetbrains.life_science.container.approach.service.PublicApproachService
import com.jetbrains.life_science.container.protocol.entity.DraftProtocol
import com.jetbrains.life_science.container.protocol.service.DraftProtocolService
import com.jetbrains.life_science.controller.protocol.draft.dto.DraftProtocolAddParticipantDTO
import com.jetbrains.life_science.controller.protocol.draft.dto.DraftProtocolDTO
import com.jetbrains.life_science.controller.protocol.draft.dto.DraftProtocolDTOToInfoAdapter
import com.jetbrains.life_science.controller.protocol.draft.view.DraftProtocolView
import com.jetbrains.life_science.controller.protocol.draft.view.DraftProtocolViewMapper
import com.jetbrains.life_science.exception.auth.ForbiddenOperationException
import com.jetbrains.life_science.section.service.SectionService
import com.jetbrains.life_science.user.credentials.entity.Credentials
import com.jetbrains.life_science.user.credentials.service.CredentialsService
import com.jetbrains.life_science.user.data.service.UserPersonalDataService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/protocols/draft")
class DraftProtocolController(
    val draftProtocolService: DraftProtocolService,
    val credentialsService: CredentialsService,
    val approachService: PublicApproachService,
    val viewMapper: DraftProtocolViewMapper,
    val userPersonalDataService: UserPersonalDataService,
    val sectionService: SectionService
) {

    @Operation(summary = "Returns DraftProtocol of interest")
    @GetMapping("/{protocolId}")
    fun get(
        @PathVariable protocolId: Long,
        @AuthenticationPrincipal user: Credentials
    ): DraftProtocolView {
        val protocol = draftProtocolService.get(protocolId)
        checkDraftProtocolAccess(protocol, user)
        return viewMapper.toView(
            draftProtocol = protocol,
            usersData = extractUsersData(protocol)
        )
    }

    @Operation(summary = "Creates new DraftProtocol")
    @PostMapping
    fun create(
        @RequestBody dto: DraftProtocolDTO,
        @AuthenticationPrincipal author: Credentials
    ): DraftProtocolView {
        val approach = approachService.get(dto.approachId)
        val info = DraftProtocolDTOToInfoAdapter(dto, approach, author)
        val protocol = draftProtocolService.create(info)
        return viewMapper.toView(
            draftProtocol = protocol,
            usersData = extractUsersData(protocol)
        )
    }

    @Operation(summary = "Deletes an existing DraftProtocol")
    @DeleteMapping("/{protocolId}")
    fun delete(
        @PathVariable protocolId: Long,
        @AuthenticationPrincipal user: Credentials
    ) {
        val protocol = draftProtocolService.get(protocolId)
        checkDraftProtocolAccess(protocol, user)
        protocol.sections.toList().forEach {
            draftProtocolService.removeSection(protocolId, it)
            sectionService.deleteById(it.id, emptyList())
        }
        draftProtocolService.delete(protocolId)
    }

    @Operation(summary = "Adds new participant to an existing DraftProtocol")
    @PostMapping("/{protocolId}/participants")
    fun addParticipant(
        @PathVariable protocolId: Long,
        @RequestBody dto: DraftProtocolAddParticipantDTO,
        @AuthenticationPrincipal author: Credentials
    ) {
        val userCredentials = credentialsService.getByEmail(dto.email)
        val protocol = draftProtocolService.get(protocolId)
        checkOwnerOrAdminAccess(protocol, author)
        draftProtocolService.addParticipant(protocol.id, userCredentials)
    }

    @Operation(summary = "Deletes an existing participant from the existing DraftProtocol")
    @DeleteMapping("/{protocolId}/participants/{participantId}")
    fun deleteParticipant(
        @PathVariable protocolId: Long,
        @PathVariable participantId: Long,
        @AuthenticationPrincipal user: Credentials
    ) {
        val protocol = draftProtocolService.get(protocolId)
        checkOwnerOrAdminAccess(protocol, user)
        val participant = credentialsService.getById(participantId)
        draftProtocolService.removeParticipant(protocol.id, participant)
    }

    private fun extractUsersData(protocol: DraftProtocol) =
        protocol.participants.map { userPersonalDataService.getByCredentials(it) }

    private fun checkDraftProtocolAccess(protocol: DraftProtocol, credentials: Credentials) {
        if (protocol.participants.all { it.id != credentials.id } && !credentials.isAdminOrModerator()) {
            throw ForbiddenOperationException()
        }
    }

    private fun checkOwnerOrAdminAccess(protocol: DraftProtocol, credentials: Credentials) {
        if (protocol.owner.id != credentials.id && !credentials.isAdminOrModerator()) {
            throw ForbiddenOperationException()
        }
    }
}
