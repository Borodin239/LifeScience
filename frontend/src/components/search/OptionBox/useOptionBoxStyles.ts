import {alpha, makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../../infrastructure/ui/themes/uiConstants";

export const useOptionBoxStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: alpha('rgba(255, 255, 255, 0.47);', 0.2)
        },
        userSelect: "none"
    },
    icon: {
        color: uiConstants.darkBlue,
        paddingRight: theme.spacing(1),
    },
}), {index: 1});