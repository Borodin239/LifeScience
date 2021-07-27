import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";

export const approachApi = {
    getApproach(approachId: string) {
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.BASE}/${approachId}`)
    }
}