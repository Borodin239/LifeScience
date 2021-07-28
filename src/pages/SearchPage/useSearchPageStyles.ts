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
    searchResultContainer: {
        marginTop: theme.spacing(3),
        width: '30%',
        display: "flex",
        justifyContent: "start",
    },
    iconContainer: {
        fontSize: "20px",
        width: '20%',
        color: theme.palette.primary.main,
    },
    searchResultName: {
        fontSize: "20px"
    }

}), {index: 1});