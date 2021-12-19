import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../../../infrastructure/ui/themes/uiConstants";

export const useAboutUsPanelStyles = makeStyles((theme) => ({
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
    textContainerImportant: {
        margin: theme.spacing(4, 0, 2, 16),
        fontWeight: "bold",
    },
    imgStyles: {
        position: 'absolute',
        borderRadius: '5px',
        height: '50px',
        width: '50px',
        margin: theme.spacing(0, 0, 2, 8)
    }

}), {index: 1});