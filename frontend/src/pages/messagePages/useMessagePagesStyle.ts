import {alpha, makeStyles} from "@material-ui/core/styles";

export const useMessagePagesStyle = makeStyles((theme) => ({
    container : {
        margin: theme.spacing(1) + ' auto',
        textAlign: 'center',
        marginTop: '5rem',
    },
    toSignUpFormButton: {
        marginTop: theme.spacing(1),
        border: '1px solid ' + theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        '&:hover' : {
            backgroundColor: alpha(theme.palette.primary.main, 0.10),
        }
    },
    upperLoader: {
        marginTop: theme.spacing(3),
    },
}), {index: 1});

