import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";
import {CreateDraftProtocolDto} from "../dto/protocol/CreateDraftProtocolDto";
import apiClientSecure from "../client/apiClientSecure";


export const protocolApi = {
    getPublicProtocol(approachId: string, protocolId: string) {
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.BASE}/${approachId}${apiConstants.routes.protocol.BASE}/${protocolId}`)
    },
    postDraftProtocol(dto: CreateDraftProtocolDto) {
        return apiClientSecure.post(`${apiConstants.routes.protocol.BASE}${apiConstants.routes.protocol.DRAFT}`, dto)
    },
    getDraftProtocol(protocolId: string) {
        return apiClientSecure.get(`${apiConstants.routes.protocol.BASE}${apiConstants.routes.protocol.DRAFT}/${protocolId}`)
    }
}