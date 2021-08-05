import {makeStyles} from "@material-ui/core/styles";

export const useSearchResultListStyles = makeStyles((theme) => ({
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
    name: {
        fontSize: "24px",
        cursor: "pointer",
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },

}), {index: 1});