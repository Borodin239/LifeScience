package com.jetbrains.life_science.controller.approach.published

import com.jetbrains.life_science.container.approach.service.PublicApproachService
import com.jetbrains.life_science.category.service.CategoryService
import com.jetbrains.life_science.controller.approach.dto.ApproachDTOToInfoAdapter
import com.jetbrains.life_science.controller.approach.dto.ApproachDTO
import com.jetbrains.life_science.controller.approach.published.view.PublicApproachView
import com.jetbrains.life_science.controller.approach.published.view.PublicApproachViewMapper
import com.jetbrains.life_science.user.credentials.entity.Credentials
import com.jetbrains.life_science.user.credentials.service.CredentialsService
import io.swagger.v3.oas.annotations.Operation
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/approaches/public")
class PublicApproachController(
    val publicApproachService: PublicApproachService,
    val categoryService: CategoryService,
    val credentialsService: CredentialsService,
    val viewMapper: PublicApproachViewMapper
) {

    @Operation(summary = "Returns PublicApproach of interest")
    @GetMapping("/{approachId}")
    fun getApproach(@PathVariable approachId: Long): PublicApproachView {
        val approach = publicApproachService.get(approachId)
        return viewMapper.toView(approach)
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Creates new PublicApproach")
    @PostMapping
    fun create(
        @RequestBody dto: ApproachDTO,
        @AuthenticationPrincipal author: Credentials
    ): PublicApproachView {
        val category = categoryService.getById(dto.initialCategoryId)
        val info = ApproachDTOToInfoAdapter(dto, category, author)
        val approach = publicApproachService.create(info)
        return viewMapper.toView(approach)
    }
}
