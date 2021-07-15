import {makeStyles} from "@material-ui/core/styles";

export const useErrorPageStyles = makeStyles((theme) => ({
    container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

        margin: theme.spacing(1) + ' auto',
        textAlign: 'center',
    },

}));