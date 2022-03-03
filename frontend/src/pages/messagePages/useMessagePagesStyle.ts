import {alpha, makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

export const useMessagePagesStyle = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: theme.spacing(5),
        borderRadius: uiConstants.borderRadius,
        background: 'white',
        textAlign: 'center',
    },
    toSignUpFormButton: {
        marginTop: theme.spacing(1),
        border: '1px solid ' + theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.10),
        }
    },
    upperLoader: {
        marginTop: theme.spacing(3),
    },
}), {index: 1});

