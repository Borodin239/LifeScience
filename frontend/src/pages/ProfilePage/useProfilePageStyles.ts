import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

export const useProfilePageStyles = makeStyles((theme) => ({

    titleContainer: {
        marginTop: theme.spacing(5),
    },
    infoListContainer: {
        marginTop: theme.spacing(3),
    },
    divider: {
        backgroundColor: theme.palette.primary.main
    },
    infoRow: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        marginTop: theme.spacing(1),
    },
    protocolsPanel: {
        marginTop: theme.spacing(2),
    },
    protocolsTitle: {
        fontSize: "18px",
        color: uiConstants.grey,
    },
    protocolTitle: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    }


}), {index: 1});