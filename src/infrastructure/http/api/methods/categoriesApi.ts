import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";

export const categoriesApi = {
    getById(id: number) {
        return apiClientDefault.get(`${apiConstants.routes.categories.INITIAL}/${id}`);
    },

    getRoot() {
        return apiClientDefault.get(apiConstants.routes.categories.ROOT);
    }
}
