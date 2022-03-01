import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useMainAppBarStyles = makeStyles((theme: Theme) =>
    createStyles({
        appbar: {
            backgroundColor: 'inherit',
            margin: "auto",
            boxShadow: 'none',
        },
        grow: {
            flexGrow: 1,
        },
        homeLink: {
            cursor: "pointer",
            fontWeight: "bold"
        }
    }),
);

export default useMainAppBarStyles;
