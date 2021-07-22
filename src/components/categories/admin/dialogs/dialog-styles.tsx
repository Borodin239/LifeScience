import {alpha, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(1, 0, 0, 0),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover' : {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    twoButtonsPanel: {
      display: "flex",
      justifyContent: "space-between",
    },
    yesButton: {
        border: "1px solid #00aa00",
        backgroundColor: alpha("#00aa00", 0.10),
        width: '45%',
        '&:hover' : {
            backgroundColor: alpha("#00aa00", 0.20),
        }
    },
    noButton: {
        border: "1px solid #aa0000",
        backgroundColor: alpha("#aa0000", 0.10),
        width: '45%',
        '&:hover' : {
            backgroundColor: alpha("#aa0000", 0.20),
        }
    }
}), {index: 1});