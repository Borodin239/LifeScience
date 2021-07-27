import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";


export const sectionApi = {
    getSection(approachId: string, sectionId: string) {
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.BASE}/${approachId}${apiConstants.routes.section.BASE}/${sectionId}`)
    }
}