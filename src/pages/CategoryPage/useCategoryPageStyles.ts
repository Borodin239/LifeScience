import {makeStyles} from "@material-ui/core/styles";

export const useCategoryPageStyles = makeStyles((theme) => ({
    upperBar: {
        margin: theme.spacing(3, 0, 2),
        width: '100%',
        display: "flex",
        justifyContent: 'space-between',
    },
    upperLoader: {
        marginTop: theme.spacing(3),
    }
}), {index: 1});