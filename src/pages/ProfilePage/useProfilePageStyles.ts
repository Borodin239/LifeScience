import {makeStyles} from "@material-ui/core/styles";

export const useProfilePageStyles = makeStyles((theme) => ({

    titleContainer: {
        marginTop: theme.spacing(5),
    },
    infoListContainer: {
        margin: theme.spacing(3, 0, 0, 2),
    },
    divider: {
        backgroundColor: theme.palette.primary.main
    },
    infoRow: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        marginTop: theme.spacing(1),
    }

}), {index: 1});