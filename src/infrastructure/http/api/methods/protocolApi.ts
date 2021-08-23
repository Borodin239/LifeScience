import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";
import {CreateDraftProtocolDto} from "../dto/protocol/CreateDraftProtocolDto";


export const protocolApi = {
    getProtocol(approachId: string, protocolId: string) {
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.BASE}/${approachId}${apiConstants.routes.protocol.BASE}/${protocolId}`)
    },
    postDraftProtocol(dto: CreateDraftProtocolDto) {
        return apiClientDefault.post(`${apiConstants.routes.protocol.BASE}${apiConstants.routes.protocol.DRAFT}`, dto)
    }
}