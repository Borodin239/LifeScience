import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../../infrastructure/ui/themes/uiConstants";

export const useUserInfoTitleStyles = makeStyles((theme) => ({
    titleContainer: {
        width: theme.spacing(15),

    },
    title: {
        fontSize: '18px',
        color: uiConstants.grey,
    }

}), {index: 1});