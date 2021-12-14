import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useAboutUsWindowStyles = makeStyles((theme: Theme) =>
    createStyles({
        closeButton: {
            // display: "inline-block",
            color: theme.palette.common.white,
            '&:hover': {
                color: theme.palette.warning.dark,
                border: "1px solid " + theme.palette.warning.dark
            },
            backgroundColor: theme.palette.primary.main,
            fontWeight: "bold",
            margin: theme.spacing(0, 0, 3, 0),
            border: "1px solid " + theme.palette.common.black,
            height: '44px',
            fontSize: '22px',

        },

        signButton: {
            display: "inline-block",
            color: theme.palette.common.white,
            fontSize: "1.1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            marginRight: theme.spacing(1)
        },
    }),
);

export default useAboutUsWindowStyles;
