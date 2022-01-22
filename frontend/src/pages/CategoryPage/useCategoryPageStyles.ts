import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

export const useCategoryPageStyles = makeStyles((theme) => ({
    main: {
        background: uiConstants.mediumBlue,
        padding: '1rem',
        flexGrow: 1,
        display: "flex",
        flexDirection: 'column'
    },
    upperBar: {
        padding: theme.spacing(2, 0, 2),
        display: "flex",
        justifyContent: 'space-between',
    },
    upperLoader: {
        marginTop: theme.spacing(3),
    }
}), {index: 1});