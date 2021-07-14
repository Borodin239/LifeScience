import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(3),
        border: "1px solid " + theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
    },
    submit: {
        margin: theme.spacing(1, 0, 0, 0),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover' : {
            backgroundColor: theme.palette.primary.dark,
        }
    }
}));