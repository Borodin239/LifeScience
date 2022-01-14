package com.jetbrains.life_science.controller.section.approach

import com.jetbrains.life_science.container.approach.entity.PublicApproach
import com.jetbrains.life_science.container.approach.service.PublicApproachService
import com.jetbrains.life_science.content.version.service.ContentVersionService
import com.jetbrains.life_science.controller.section.dto.SectionCreationDTO
import com.jetbrains.life_science.controller.section.dto.SectionCreationDTOToInfoAdapter
import com.jetbrains.life_science.controller.section.dto.SectionDTO
import com.jetbrains.life_science.controller.section.dto.SectionDTOToInfoAdapter
import com.jetbrains.life_science.controller.section.view.SectionView
import com.jetbrains.life_science.controller.section.view.SectionViewMapper
import com.jetbrains.life_science.exception.auth.ForbiddenOperationException
import com.jetbrains.life_science.exception.section.SectionAlreadyPublishedException
import com.jetbrains.life_science.exception.section.SectionNotFoundException
import com.jetbrains.life_science.section.entity.Section
import com.jetbrains.life_science.section.service.SectionService
import com.jetbrains.life_science.user.credentials.entity.Credentials
import io.swagger.v3.oas.annotations.Operation
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/approaches/public/{approachId}/sections")
class PublicApproachSectionController(
    val publicApproachService: PublicApproachService,
    val sectionService: SectionService,
    val contentVersionService: ContentVersionService,
    val viewMapper: SectionViewMapper
) {

    @Operation(summary = "Returns an existing PublicApproach section")
    @GetMapping("/{sectionId}")
    fun getSection(
        @PathVariable approachId: Long,
        @PathVariable sectionId: Long,
    ): SectionView {
        val section = getSectionSecured(approachId, sectionId)
        val content = contentVersionService.findBySectionId(sectionId)
        return viewMapper.toView(section, content?.text)
    }

    @Operation(summary = "Creates one new PublicApproach section")
    @PostMapping
    fun createSection(
        @PathVariable approachId: Long,
        @RequestBody dto: SectionCreationDTO,
        @AuthenticationPrincipal credentials: Credentials
    ): SectionView {
        val approach = getApproachSecured(approachId, credentials)
        val prevSection = dto.prevSectionId?.let { getSectionSecured(approach.id, it) }
        val info = SectionCreationDTOToInfoAdapter(dto, prevSection, approach.sections)
        val section = sectionService.create(info)
        publicApproachService.addSection(approachId, section)
        return viewMapper.toView(section)
    }

    @Operation(summary = "Deletes an existing PublicApproach section")
    @DeleteMapping("/{sectionId}")
    fun delete(
        @PathVariable approachId: Long,
        @PathVariable sectionId: Long,
        @AuthenticationPrincipal credentials: Credentials
    ) {
        val approach = getApproachSecured(approachId, credentials)
        val section = sectionService.getById(sectionId)
        publicApproachService.removeSection(approachId, section)
        sectionService.deleteById(sectionId, approach.sections)
    }

    @Operation(summary = "Updates an existing PublicApproach section")
    @PatchMapping("/{sectionId}")
    fun updateSection(
        @PathVariable approachId: Long,
        @PathVariable sectionId: Long,
        @AuthenticationPrincipal credentials: Credentials,
        @RequestBody dto: SectionDTO
    ): SectionView {
        val approach = getApproachSecured(approachId, credentials)
        val section = getSectionSecured(approach.id, sectionId)

        if (section.published) throw SectionAlreadyPublishedException()

        val prevSection = dto.prevSectionId?.let { getSectionSecured(approach.id, it) }
        val info = SectionDTOToInfoAdapter(dto, approach.sections, prevSection)
        val result = sectionService.update(section, info)
        val content = contentVersionService.findBySectionId(sectionId)

        return viewMapper.toView(result, content?.text)
    }

    private fun getApproachSecured(
        approachId: Long,
        credentials: Credentials
    ): PublicApproach {
        val approach = publicApproachService.get(approachId)
        if (!publicApproachService.hasCoAuthor(approachId, credentials)) {
            throw ForbiddenOperationException()
        }
        return approach
    }

    private fun getSectionSecured(
        publicApproachId: Long,
        sectionId: Long
    ): Section {
        val section = sectionService.getById(sectionId)
        if (!publicApproachService.hasSection(publicApproachId, section)) {
            throw SectionNotFoundException(sectionId)
        }
        return section
    }
}
