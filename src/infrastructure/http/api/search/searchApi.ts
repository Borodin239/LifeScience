import apiClientDefault from "../client/apiClientDefault";
import {SearchDto} from "../../../../redux/search/slice";
import apiConstants from "../apiConstants";


export const searchApi = {
    search(dto: SearchDto) {
        return apiClientDefault.post(apiConstants.routes.search.SEARCH, dto)
    }
}