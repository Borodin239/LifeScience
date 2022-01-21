import {alpha, makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

export const useProfilePageStyles = makeStyles((theme) => ({
    avatar: {
        // borderRadius: '5px',
        height: '15rem',
        width: '15rem',
    },

    button: {
        marginTop: theme.spacing(1),
        height: '40px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        color: theme.palette.common.white,
        border: 'none',
        backgroundColor: uiConstants.mediumBlue,
        '&:hover': {
            backgroundColor: alpha(uiConstants.mediumBlue, 0.6),
        },
        borderRadius: '7px',
        width: "auto",
    },

    submitButton: {
        padding: theme.spacing(1, 2, 1, 2),
        fontSize: '18px',
        marginRight: theme.spacing(1),
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
    },

    root: {
        justifyContent: 'center'
    },
    scroller: {
        flexGrow: 0,
    }
}), {index: 1});