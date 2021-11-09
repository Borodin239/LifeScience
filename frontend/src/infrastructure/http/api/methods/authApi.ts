import {SignInDto} from "../dto/auth/SignInDto";
import {SignUpDto} from "../dto/auth/SignUpDto";
import apiClientDefault from "../client/apiClientDefault";
import apiConstants from "../apiConstants";

export const authApi = {
    signIn(dto: SignInDto) {
        return apiClientDefault.post(apiConstants.routes.auth.SIGN_IN, dto);
    },
    signUp(dto: SignUpDto) {
        return apiClientDefault.post(apiConstants.routes.auth.SIGN_UP, dto);
    },
    refresh() {
        return apiClientDefault.patch(apiConstants.routes.auth.REFRESH);
    },
    resend(email: string) {
        return apiClientDefault.patch(apiConstants.routes.auth.RESEND, {email});
    },
}
