import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";


export const sectionApi = {
    getSection(approachId: string, sectionId: string) {
        console.log(`${apiConstants.routes.publicApproach.GET}
        ${approachId}${apiConstants.routes.section.GET}/${sectionId}`)
        return apiClientDefault.get(`${apiConstants.routes.publicApproach.GET}/${approachId}${apiConstants.routes.section.GET}/${sectionId}`)
    }
}