import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../../infrastructure/ui/themes/uiConstants";

export const useInfoPanelStyles = makeStyles((theme) => ({
    mainContainer: {
        height: "1600px",
        width: uiConstants.width,
        margin: 'auto'
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
    welcomeLabelContainer: {
        textAlign: "center",
        margin: theme.spacing(4, 0, 2, 0),
    },
    textContainer: {
        marginTop: theme.spacing(2),
    },


}), {index: 1});