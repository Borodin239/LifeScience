import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    dots: {
        color: theme.palette.primary.main,
    },
    menu: {
        border: "1px solid " + theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
    }
}), {index: 1});