import {makeStyles} from "@material-ui/core/styles";
import uiConstants from "../../../infrastructure/ui/themes/uiConstants";

const useApproachesListStyles = makeStyles((theme) => ({
    container: {
        alignSelf: 'center',
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        width: '100%',
        flexGrow: 1,
        display: "flex",
        flexDirection: 'column'
    },
    rootNodes: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr"
    },
    nodes: {
        padding: theme.spacing(1),
        flexDirection: "column",
        alignItems: "flex-start"
    },
    approaches: {
        background: uiConstants.nodeBoxLight,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        flexGrow: 1,
    },
    sortBy: {
        color: 'white',
        marginBottom: '1rem',
    }
}), {index: 1});

export default useApproachesListStyles