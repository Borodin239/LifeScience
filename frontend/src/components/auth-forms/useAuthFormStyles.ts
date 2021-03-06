import {makeStyles} from "@material-ui/core/styles";

const useAuthFormStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        color: theme.palette.text.primary,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        // border: '1px solid ' + theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    redirect: {
        cursor: "pointer",
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: "underline",
        },
        margin: theme.spacing(1, 0, 0, 0),
        textAlign: "center",
    },
    loader: {
        display: "flex",
        justifyContent: "space-around",
    }
}), {index: 1});

export default useAuthFormStyles;
