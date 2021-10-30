import {makeStyles} from "@material-ui/core/styles";


export const useAddProtocolStyles = makeStyles((theme) => ({
    container: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
    },
    text: {
        marginLeft: theme.spacing(1),
    },
    icon: {
        color: theme.palette.primary.main,
    }

}), {index: 1});