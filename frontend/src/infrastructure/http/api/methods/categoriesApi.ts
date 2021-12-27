import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";
import {CreateCategoryDto} from "../dto/category/CreateCategoryDto";
import {UpdateCategoryDto} from "../dto/category/UpdateCategoryDto";
import apiClientSecure from "../client/apiClientSecure";

export const categoriesApi = {
    getById(id: number) {
        return apiClientDefault.get(`${apiConstants.routes.categories.INITIAL}/${id}`);
    },

    getRoot() {
        return apiClientDefault.get(apiConstants.routes.categories.ROOT);
    },

    getPaths(id: string) {
        return apiClientDefault.get(`${apiConstants.routes.categories.INITIAL}/${id}${apiConstants.routes.categories.PATHS}`)
    },

    createCategory(categoryInfo: CreateCategoryDto) {
        return apiClientSecure.post(apiConstants.routes.categories.INITIAL, categoryInfo)
    },

    deleteCategory(id: string) {
        return apiClientSecure.delete(`${apiConstants.routes.categories.INITIAL}/${id}`)
    },

    updateCategory(categoryInfo: UpdateCategoryDto, id: string) {
        return apiClientSecure.patch(`${apiConstants.routes.categories.INITIAL}/${id}`, categoryInfo)
    }
}