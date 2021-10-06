import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../infrastructure/ui/themes/uiConstants";

export const useAppStyles = makeStyles((theme) => ({
    fixedWidth: {
        width: uiConstants.width,
        margin: "auto",
    }

}), {index: 1});