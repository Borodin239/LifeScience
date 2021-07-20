import {alpha, createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.primary.light, 0.55),
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.light, 0.75),
            },
            marginLeft: "50px",
            width: '500px',
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: "100%",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        grow: {
            flexGrow: 1,
        },
        signButton: {
            display: "inline-block",
            color: theme.palette.common.white,
            fontSize: "1.1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            marginRight: theme.spacing(1),
        },
        homeLink: {
            cursor: "pointer",
        }
    }),
);

export default useMainAppBarStyles;
