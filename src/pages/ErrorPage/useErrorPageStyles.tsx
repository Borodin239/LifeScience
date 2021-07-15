import {alpha, makeStyles} from "@material-ui/core/styles";

export const useErrorPageStyles = makeStyles((theme) => ({
    container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

        margin: theme.spacing(1) + ' auto',
        textAlign: 'center',
    },
    toHomeButton: {
        marginTop: theme.spacing(1),
        border: '1px solid ' + theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        '&:hover' : {
            backgroundColor: alpha(theme.palette.primary.main, 0.10),
        }
    },

}));