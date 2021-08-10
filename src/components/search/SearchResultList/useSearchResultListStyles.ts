import {makeStyles} from "@material-ui/core/styles";

export const useSearchResultListStyles = makeStyles((theme) => ({
    searchResultContainer: {
        marginTop: theme.spacing(2),
        width: 'auto',
        display: "flex",
        justifyContent: "start",
        padding: theme.spacing(1),
    },
    iconContainer: {
        fontSize: "20px",
        color: theme.palette.primary.main,
    },
    name: {
        fontSize: "24px",
        cursor: "pointer",
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
    contentContainer: {
        marginLeft: theme.spacing(2),
    }

}), {index: 1});