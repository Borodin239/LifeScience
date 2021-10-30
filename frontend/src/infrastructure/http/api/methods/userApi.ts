import apiClientSecure from "../client/apiClientSecure";
import apiConstants from "../apiConstants";

export const userApi = {
    getCurrent() {
        return apiClientSecure.get(`${apiConstants.routes.users.BASE}${apiConstants.routes.users.CURRENT}`);
    },
    getDraftProtocols(userId: string) {
        return apiClientSecure.get(`${apiConstants.routes.users.BASE}/${userId}${apiConstants.routes.protocol.BASE}${apiConstants.routes.protocol.DRAFT}`);
    }
}
