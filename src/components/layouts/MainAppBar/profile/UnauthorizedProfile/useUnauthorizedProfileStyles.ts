import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


export const useUnauthorizedProfileStyles = makeStyles((theme: Theme) => createStyles({
    signButton: {
        display: "inline-block",
        color: theme.palette.common.white,
        fontSize: "1.1rem",
        fontWeight: 500,
        lineHeight: 1.5,
        marginRight: theme.spacing(1),
    },
}));