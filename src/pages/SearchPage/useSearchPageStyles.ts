import {makeStyles} from "@material-ui/core/styles";

export const useSearchPageStyles = makeStyles((theme) => ({
    searchFieldContainer: {
        marginTop: theme.spacing(4),
    },
    searchField: {
        border: "1px solid " + theme.palette.primary.main
    },
    titleContainer: {
        marginTop: theme.spacing(3),
        borderBottom: "1px solid " + theme.palette.primary.main,
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
    loader: {
        marginTop: theme.spacing(4),
    }

}), {index: 1});