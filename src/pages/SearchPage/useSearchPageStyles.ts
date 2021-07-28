import {makeStyles} from "@material-ui/core/styles";

export const useSearchPageStyles = makeStyles((theme) => ({
    searchFieldContainer: {
        marginTop: theme.spacing(4),
    },
    searchField: {
        border: "1.5px solid " + theme.palette.primary.main
    }

}), {index: 1});