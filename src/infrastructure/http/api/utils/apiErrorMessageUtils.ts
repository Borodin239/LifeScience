import {ApiErrorDto} from "../dto/ApiErrorDto";
import {apiErrorsInfo} from "../apiErrorsInfo";
import apiConstants from "../apiConstants";

export const createApiErrorMessage = (dto: ApiErrorDto) => {
    let pattern = apiErrorsInfo.get(dto.systemCode)?.messagePattern ?? apiConstants.DEFAULT_ERROR_MESSAGE

    return dto.arguments.reduce((resultMsg, argBlock, ind) =>
            resultMsg.replace(new RegExp('\\$' + `${ind}`, 'g'), argBlock.join(', ')),
        pattern);
}
