import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import uiConstants from "../../../../../infrastructure/ui/themes/uiConstants";


export const useUnauthorizedProfileStyles = makeStyles((theme: Theme) => createStyles({
    signButton: {
        display: "inline-block",
        color: uiConstants.orange,
        fontSize: "1.1rem",
        fontWeight: "bold",
        lineHeight: 1.5,
        marginRight: theme.spacing(1),
    },
}), {index: 1});