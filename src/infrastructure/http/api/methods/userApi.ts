import apiClientSecure from "../client/apiClientSecure";
import apiConstants from "../apiConstants";

export const userApi = {
    getCurrent() {
        return apiClientSecure.get(`${apiConstants.routes.users.CURRENT}`);
    }
}
