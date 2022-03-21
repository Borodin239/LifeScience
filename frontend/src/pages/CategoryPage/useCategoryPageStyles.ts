import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

export const useCategoryPageStyles = makeStyles((theme) => ({
    main: {
        background: uiConstants.mediumBlue,
        padding: '1rem 1rem 0 1rem',
        flexGrow: 1,
        display: "flex",
        flexDirection: 'column'
    },
    container: {
        display: "flex",
        flexDirection: 'column',
        flexGrow: 1,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },
    upperBar: {
        padding: theme.spacing(2, 0, 2),
        display: "flex",
        justifyContent: 'space-between',
    },
    upperLoader: {
        marginTop: theme.spacing(3),
    },
    search: {
        background: uiConstants.nodeBoxLight,
        borderRadius: uiConstants.borderRadius,
        margin: '0 0 30px 0'
    },
}), {index: 1});