import {makeStyles} from "@material-ui/core/styles";

export const useInfoPanelStyles = makeStyles((theme) => ({
    mainContainer: {
        height: "1600px",
        width: '100%',
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
    welcomeLabelContainer: {
        textAlign: "center",
        margin: theme.spacing(4, 0, 2, 0),
    },
    textContainer: {
        marginTop: theme.spacing(2),
    },


}), {index: 1});