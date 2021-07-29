import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";


export const protocolApi = {
    getProtocol(approachId: string, protocolId: string) {
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.BASE}/${approachId}/${apiConstants.routes.protocol.BASE}/${protocolId}`)
    }
}