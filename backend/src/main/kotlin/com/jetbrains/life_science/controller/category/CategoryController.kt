package com.jetbrains.life_science.controller.category

import com.jetbrains.life_science.category.dto.CategoryCreationDTOToInfoAdapter
import com.jetbrains.life_science.category.service.CategoryService
import com.jetbrains.life_science.controller.category.dto.CategoryCreationDTO
import com.jetbrains.life_science.controller.category.dto.CategoryUpdateDTO
import com.jetbrains.life_science.controller.category.dto.CategoryUpdateDTOToInfoAdapter
import com.jetbrains.life_science.controller.category.view.CategoryShortView
import com.jetbrains.life_science.controller.category.view.CategoryView
import com.jetbrains.life_science.controller.category.view.CategoryViewMapper
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/categories")
class CategoryController(
    val categoryService: CategoryService,
    val viewMapper: CategoryViewMapper
) {

    @GetMapping("/root")
    fun getRootCategories(): List<CategoryShortView> {
        val categories = categoryService.getRootCategories()
        return viewMapper.toViewsShort(categories)
    }

    @GetMapping("/{id}")
    fun getCategory(@PathVariable id: Long): CategoryView {
        val category = categoryService.getCategory(id)
        return viewMapper.toView(category)
    }

    @PostMapping
    fun create(@RequestBody categoryCreationDTO: CategoryCreationDTO): CategoryShortView {
        val categoryInfo = CategoryCreationDTOToInfoAdapter(categoryCreationDTO)
        val category = categoryService.createCategory(categoryInfo)
        return viewMapper.toViewShort(category)
    }

    @PatchMapping("/{categoryId}")
    fun update(
        @RequestBody categoryUpdateDTO: CategoryUpdateDTO,
        @PathVariable categoryId: Long
    ): CategoryView {
        val categoryUpdateInfo = CategoryUpdateDTOToInfoAdapter(categoryUpdateDTO, categoryId)
        val category = categoryService.updateCategory(categoryUpdateInfo)
        return viewMapper.toView(category)
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) {
        categoryService.deleteCategory(id)
    }
}
