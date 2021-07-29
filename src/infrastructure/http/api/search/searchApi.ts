import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";
import {SearchDto} from "../dto/search/SearchDto";


export const searchApi = {
    search(dto: SearchDto) {
        return apiClientDefault.post(apiConstants.routes.search.SEARCH, dto)
    }
}