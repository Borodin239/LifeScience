import {alpha, makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

export const useProfilePageStyles = makeStyles((theme) => ({
    avatar: {
        borderRadius: '5px',
        height: '200px',
        width: '200px',
    },

    button: {
        marginTop: theme.spacing(1),
        height: '50px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        color: theme.palette.common.white,
        border: 'none',
        backgroundColor: alpha(theme.palette.primary.main, 1),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.6),
        },
        borderRadius: '5px',
        width: "auto",
    },

    submitButton: {
        marginTop: theme.spacing(1),
        height: '50px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        color: theme.palette.common.white,
        border: 'none',
        backgroundColor: alpha(theme.palette.primary.main, 0.6),
        borderRadius: '5px',
        width: "auto",
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