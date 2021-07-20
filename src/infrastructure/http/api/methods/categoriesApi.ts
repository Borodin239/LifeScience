import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";

export const categoriesApi = {
    getById(id: number) {
        return apiClientDefault.get(id === apiConstants.common.ROOT_ID ?
            apiConstants.routes.categories.ROOT :
            `${apiConstants.routes.categories.INITIAL}/${id}`);
    }
}
