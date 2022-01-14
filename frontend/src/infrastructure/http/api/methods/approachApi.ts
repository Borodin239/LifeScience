import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";
import apiClientSecure from "../client/apiClientSecure";
import {CreatePublicApproachDto} from "../dto/approach/CreatePublicApproachDto";

export const approachApi = {
    getApproach(approachId: string) {
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.BASE}/${approachId}`)
    },
    postPublicApproach(dto: CreatePublicApproachDto) {
        return apiClientSecure.post(`${apiConstants.routes.publicApproach.BASE}`, dto)
    },
}