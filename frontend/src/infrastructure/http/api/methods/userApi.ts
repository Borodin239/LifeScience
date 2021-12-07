import apiClientSecure from "../client/apiClientSecure";
import apiConstants from "../apiConstants";
import {UserDTO} from "../view/social/user/UserDTO";

export const userApi = {
    getCurrent() {
        return apiClientSecure.get(`${apiConstants.routes.users.BASE}${apiConstants.routes.users.CURRENT}`);
    },
    getDraftProtocols(userId: string) {
        return apiClientSecure.get(`${apiConstants.routes.users.BASE}/${userId}${apiConstants.routes.protocol.BASE}${apiConstants.routes.protocol.DRAFT}`);
    },
    updateUserData(userDTO: UserDTO, userId: string) {
        return apiClientSecure.patch(`${apiConstants.routes.users.BASE}/${userId}/data`)
    }
}
