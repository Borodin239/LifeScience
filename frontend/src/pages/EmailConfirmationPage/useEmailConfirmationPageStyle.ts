import {alpha, makeStyles} from "@material-ui/core/styles";

export const useEmailConfirmationPageStyle = makeStyles((theme) => ({
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
}), {index: 1});

