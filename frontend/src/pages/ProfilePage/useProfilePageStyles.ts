import {alpha, makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

export const useProfilePageStyles = makeStyles((theme) => ({

    // TODO :: copy-paste
    button: {
        marginTop: theme.spacing(1),
        // padding: theme.spacing(0, 3, 0, 3),
        height: '50px',
        fontSize: '22px',
        color: theme.palette.common.white,
        border: 'none',
        backgroundColor: alpha(theme.palette.primary.main, 1),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.6),
        },
        borderRadius: '10px'
    },


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