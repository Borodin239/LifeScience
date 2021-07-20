import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";

export const approachApi = {
    getApproach(approachId: number) {
        return apiClientDefault.get(`${apiConstants.routes.approach.GET}/${approachId}`)
    }
}