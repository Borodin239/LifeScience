import {alpha, makeStyles} from "@material-ui/core/styles";

export const useErrorPageStyles = makeStyles((theme) => ({
    container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: theme.spacing(5),
        borderRadius: theme.shape.borderRadius,
        background: 'white',
        textAlign: 'center',
    },
    toHomeButton: {
        margin: theme.spacing(1),
        border: '1px solid ' + theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        '&:hover' : {
            backgroundColor: alpha(theme.palette.primary.main, 0.10),
        }
    },

}), {index: 1});