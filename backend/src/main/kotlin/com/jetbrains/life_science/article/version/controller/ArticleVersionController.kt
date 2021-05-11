package com.jetbrains.life_science.article.version.controller

import com.jetbrains.life_science.article.content.publish.dto.ContentInnerDTOToInfoAdapter
import com.jetbrains.life_science.article.content.version.service.ContentVersionService
import com.jetbrains.life_science.article.master.view.ArticleFullPageView
import com.jetbrains.life_science.article.section.dto.SectionInnerDTOToInfoAdapter
import com.jetbrains.life_science.article.section.service.SectionService
import com.jetbrains.life_science.article.version.dto.ArticleVersionCreationDTO
import com.jetbrains.life_science.article.version.dto.ArticleVersionCreationDTOToInfoAdapter
import com.jetbrains.life_science.article.version.dto.ArticleVersionDTO
import com.jetbrains.life_science.article.version.dto.ArticleVersionDTOToInfoAdapter
import com.jetbrains.life_science.article.version.entity.ArticleVersion
import com.jetbrains.life_science.article.version.entity.State
import com.jetbrains.life_science.article.version.service.ArticleVersionService
import com.jetbrains.life_science.article.version.view.ArticleVersionView
import com.jetbrains.life_science.article.version.view.ArticleVersionViewMapper
import com.jetbrains.life_science.exception.UnauthorizedException
import com.jetbrains.life_science.exception.request.BadRequestException
import com.jetbrains.life_science.user.master.entity.User
import com.jetbrains.life_science.user.master.service.UserCredentialsService
import com.jetbrains.life_science.user.master.service.UserService
import com.jetbrains.life_science.util.email
import io.swagger.v3.oas.annotations.Operation
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.access.annotation.Secured
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/api/articles/versions")
class ArticleVersionController(
    val articleVersionService: ArticleVersionService,
    val sectionService: SectionService,
    val contentVersionService: ContentVersionService,
    val viewMapper: ArticleVersionViewMapper,
    val userService: UserService
) {

    @Operation(summary = "Returns a version, if it's available to the user")
    @GetMapping("/{versionId}")
    fun getVersion(
        @PathVariable versionId: Long,
        principal: Principal?
    ): ArticleVersionView {
        val version = articleVersionService.getById(versionId)
        if (!version.isPublished) {
            if (principal == null) throw UnauthorizedException("user do not have permissions")
            val user = userService.getByEmail(principal.email)
            validateViewPermission(user, version)
        }
        return viewMapper.toView(version)
    }

    @Operation(summary = "Returns a version, if it's available to the user. The protocol supplements the sections of the main part.")
    @GetMapping("/completed/{versionId}")
    fun getVersionCompletedPresentation(
        @PathVariable versionId: Long,
        principal: Principal
    ): ArticleFullPageView {
        val version = articleVersionService.getById(versionId)
        val user = userService.getByEmail(principal.email)
        validateViewPermission(user, version)
        return when (version.state) {
            State.PUBLISHED_AS_PROTOCOL -> {
                val publishedArticleVersion = articleVersionService.getPublishedVersionByArticle(version.mainArticle)
                viewMapper.toCompletedView(version, publishedArticleVersion)
            }
            State.PUBLISHED_AS_ARTICLE -> viewMapper.toCompletedView(version)
            else -> throw BadRequestException("Article version is not published yet")
        }
    }


    @Operation(summary = "Creates new article AND new version inside it with optional sections and content")
    @PostMapping
    @Transactional
    fun createNewVersion(
        @Validated @RequestBody dto: ArticleVersionCreationDTO,
        principal: Principal
    ): ArticleVersionView {
        val user = userService.getByEmail(principal.email)
        val createdVersion = articleVersionService.createBlank(
            ArticleVersionCreationDTOToInfoAdapter(dto, user)
        )
        for ((order, sectionInnerDTO) in dto.sections.withIndex()) {
            val sectionInfo = SectionInnerDTOToInfoAdapter(createdVersion.id, order, sectionInnerDTO)
            val createdSection = sectionService.create(sectionInfo)

            val content = sectionInnerDTO.content

            if (content != null) {
                val contentInfo = ContentInnerDTOToInfoAdapter(createdSection.id, content)
                contentVersionService.create(contentInfo)

                createdVersion.sections.add(createdSection)
            }
        }
        return viewMapper.toView(createdVersion)
    }

    @Operation(summary = "Creates copy of existing version associated with same article")
    @PutMapping("/{sampleVersionId}/copy")
    fun createCopiedVersion(
        @PathVariable sampleVersionId: Long,
        principal: Principal
    ): ArticleVersionView {
        val user = userService.getByEmail(principal.email)
        val createdVersion = articleVersionService.createCopy(sampleVersionId, user)
        return viewMapper.toView(createdVersion)
    }

    @Operation(summary = "Updates existing version if it's available to the user")
    @PutMapping("/{versionId}")
    fun updateVersion(
        @PathVariable versionId: Long,
        @Validated @RequestBody dto: ArticleVersionDTO,
        principal: Principal
    ): ArticleVersionView {
        checkUpdatePermission(versionId, principal)
        val user = userService.getByEmail(principal.email)
        val updatedVersion = articleVersionService.updateById(ArticleVersionDTOToInfoAdapter(dto, user, versionId))
        return viewMapper.toView(updatedVersion)
    }

    @Operation(summary = "Changes version state to ARCHIVED")
    @Secured("ROLE_MODERATOR", "ROLE_ADMIN")
    @PatchMapping("/{versionId}/archive")
    fun archive(
        @PathVariable versionId: Long,
        principal: Principal
    ) {
        articleVersionService.archive(versionId)
    }

    private fun checkUpdatePermission(
        versionId: Long,
        principal: Principal
    ) {
        val articleVersion = articleVersionService.getById(versionId)
        val user = userService.getByEmail(principal.email)
        if (!articleVersion.canModify(user)) {
            throw AccessDeniedException("User has no access to that version")
        }
    }

    private fun validateViewPermission(user: User, articleVersion: ArticleVersion) {
        if (!articleVersion.canRead(user)) {
            throw AccessDeniedException("User has no access to that version")
        }
    }
}
