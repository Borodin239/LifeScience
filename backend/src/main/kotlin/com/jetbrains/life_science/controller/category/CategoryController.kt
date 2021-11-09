package com.jetbrains.life_science.controller.category

import com.jetbrains.life_science.category.search.Path
import com.jetbrains.life_science.category.search.service.CategorySearchUnitService
import com.jetbrains.life_science.category.service.CategoryService
import com.jetbrains.life_science.controller.category.dto.CategoryCreationDTO
import com.jetbrains.life_science.controller.category.dto.CategoryCreationDTOToInfoAdapter
import com.jetbrains.life_science.controller.category.dto.CategoryUpdateDTO
import com.jetbrains.life_science.controller.category.dto.CategoryUpdateDTOToInfoAdapter
import com.jetbrains.life_science.controller.category.view.CategoryShortView
import com.jetbrains.life_science.controller.category.view.CategoryView
import com.jetbrains.life_science.controller.category.view.CategoryViewMapper
import com.jetbrains.life_science.user.credentials.entity.Credentials
import io.swagger.v3.oas.annotations.Operation
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/categories")
class CategoryController(
    val categoryService: CategoryService,
    val categorySearchUnitService: CategorySearchUnitService,
    val viewMapper: CategoryViewMapper
) {

    @Operation(summary = "Returns list of root's categories")
    @GetMapping("/root")
    fun getRootCategories(): List<CategoryShortView> {
        val categories = categoryService.getRootCategories()
        return viewMapper.toViewsShort(categories)
    }

    @Operation(summary = "Returns the category of interests")
    @GetMapping("/{id}")
    fun getCategory(@PathVariable id: Long): CategoryView {
        val category = categoryService.getById(id)
        return viewMapper.toView(category)
    }

    @Operation(summary = "Returns RANDOM category path of all possible")
    @GetMapping("/{id}/paths")
    fun getPaths(@PathVariable id: Long): List<Path> {
        val category = categoryService.getById(id)
        return categorySearchUnitService.getPaths(category)
    }

    @Operation(summary = "Creates one new category")
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun create(@Validated @RequestBody categoryCreationDTO: CategoryCreationDTO): CategoryShortView {
        val categoryInfo = CategoryCreationDTOToInfoAdapter(categoryCreationDTO)
        val category = categoryService.createCategory(categoryInfo)
        return viewMapper.toViewShort(category)
    }

    @Operation(summary = "Updates an existing category")
    @PatchMapping("/{categoryId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun update(
        @Validated @RequestBody categoryUpdateDTO: CategoryUpdateDTO,
        @PathVariable categoryId: Long
    ): CategoryView {
        val categoryUpdateInfo = CategoryUpdateDTOToInfoAdapter(categoryUpdateDTO, categoryId)
        val category = categoryService.updateCategory(categoryUpdateInfo)
        return viewMapper.toView(category)
    }

    @Operation(summary = "Deletes an existing category")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun delete(@PathVariable id: Long, @AuthenticationPrincipal credentials: Credentials) {
        categoryService.deleteCategory(id)
    }
}
