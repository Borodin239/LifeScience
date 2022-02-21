import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

const useNodeBoxStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            alignItems: "center",
            borderRadius: '10px',
            margin: theme.spacing(1),
            padding: '0.3rem 0.6rem 0.3rem 0.6rem',
            height: '3rem',
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            cursor: "pointer",
            "&:hover": {
                backgroundColor: uiConstants.lightGrey
            },
            userSelect: "none",
            background: uiConstants.nodeBoxLight,
            justifyContent: 'space-between',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)'
        },
        icon: {
            color: uiConstants.darkBlue,
            paddingRight: theme.spacing(1),
        },
        node: {
            verticalAlign: "middle",
            color: uiConstants.darkBlue,
            fontWeight: 'bolder',
            textTransform: 'uppercase'
        },


        imageIcon: {
            display: 'flex',
            height: 'inherit',
            width: 'inherit',
        },
        iconRoot: {
            textAlign: 'center',
        },
        sign: {
            // fontWeight: 10,
            // fontSize: '200px',
            flexGrow: 1,
            textAlign: "center"
        },
    }
), {index: 1});

export default useNodeBoxStyles