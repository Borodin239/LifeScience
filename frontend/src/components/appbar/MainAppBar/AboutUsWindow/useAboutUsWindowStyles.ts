import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useAboutUsWindowStyles = makeStyles((theme: Theme) =>
    createStyles({
        // closeButton: {
        //     // display: "inline-block",
        //     color: theme.palette.common.black,
        //     '&:hover': {
        //         color: theme.palette.warning.dark
        //     },
        //     fontSize: "2rem",
        //     height: "2rem",
        //     wight: "2rem",
        //     justifyContent: "right",
        //     alignItems: 'right'
        // },

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
