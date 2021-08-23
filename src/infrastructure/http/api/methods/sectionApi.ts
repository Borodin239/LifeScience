import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";
import {PatchDraftProtocolSectionDto} from "../dto/section/PatchDraftProtocolSectionDto";


export const sectionApi = {
    getApproachSection(approachId: string, sectionId: string) {
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.BASE}/${approachId}${apiConstants.routes.section.BASE}/${sectionId}`)
    },
    getProtocolSection(approachId: string, protocolId: string, sectionId: string) {
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.BASE}/${approachId}${apiConstants.routes.protocol.BASE}/${protocolId}${apiConstants.routes.section.BASE}/${sectionId}`)
    },
    patchDraftProtocolSection(dto: PatchDraftProtocolSectionDto, protocolId: string, sectionId: string) {
        return apiClientDefault.patch(`${apiConstants.routes.protocol.BASE}${apiConstants.routes.protocol.DRAFT}/${protocolId}${apiConstants.routes.section.BASE}/${sectionId}`, dto)
    }
}