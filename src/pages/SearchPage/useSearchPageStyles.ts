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
        marginTop: theme.spacing(2),
        width: '30%',
        display: "flex",
        justifyContent: "start",
        padding: theme.spacing(1),
    },
    iconContainer: {
        fontSize: "20px",
        width: '20%',
        color: theme.palette.primary.main,
    },
    searchResultName: {
        fontSize: "24px"
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    }

}), {index: 1});