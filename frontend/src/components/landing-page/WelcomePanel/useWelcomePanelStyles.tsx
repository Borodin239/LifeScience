import {alpha, makeStyles} from "@material-ui/core/styles";

export const useWelcomePanelStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    centerContainer: {
        color: theme.palette.common.white,
        textAlign: 'center',
    },
    browseButton: {
        marginTop: theme.spacing(7),
        padding: theme.spacing(0, 3, 0, 3),
        height: '50px',
        fontSize: '22px',
        color: theme.palette.common.white,
        backgroundColor: alpha(theme.palette.primary.dark, 0.45),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.dark, 0.85),
        },
        // border: "1px solid " + theme.palette.common.white,
    },
    searchPaper: {
        margin: '0 auto',
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        width: '500px',
    },
    iconButton: {
        padding: theme.spacing(1),
        color: alpha(theme.palette.primary.dark, 0.85),
    },
    input: {
        flex: 1,
    },
    mainName: {
        textAlign: "start",
    },
    orText: {
        marginTop: theme.spacing(1),
    }


}), {index: 1});