import {AppDispatch} from "../../redux/store/store";
import {ROOT_NAVIGATION_UNIT} from "../../redux/navigation/slice";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";

const handleErrors = (thunkError: any, history: any, dispatch: AppDispatch,
                      setAlertText: (alertText: string | null) => void) => {
    if (thunkError.name === 'ApiError') {
        if (thunkError.description.httpCode === 400) {
            setAlertText(thunkError.description.message);
        } else if (thunkError.description.httpCode === 404) {
            history.push(ROOT_NAVIGATION_UNIT.route);
        } else {
            handleThunkErrorBase(thunkError, history, dispatch);
        }
    } else {
        handleThunkErrorBase(thunkError, history, dispatch);
    }
}

export default handleErrors;