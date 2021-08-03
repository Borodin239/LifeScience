import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../../infrastructure/ui/themes/uiConstants";

export const useUserInfoTitleStyles = makeStyles((theme) => ({
    titleContainer: {
        padding: theme.spacing(1),
    },
    title: {
        fontSize: '18px',
        color: uiConstants.grey,
    }

}), {index: 1});