import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useMainAppBarStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            backgroundColor: theme.palette.primary.main,
        },
        appbar: {
            width: "1100px",
            margin: "auto",
            boxShadow: 'none',
        },
        grow: {
            flexGrow: 1,
        },
        homeLink: {
            cursor: "pointer",
        }
    }),
);

export default useMainAppBarStyles;
