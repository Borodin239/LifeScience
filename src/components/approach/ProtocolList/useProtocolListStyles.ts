import {makeStyles} from "@material-ui/core/styles";


export const useProtocolListStyles = makeStyles((theme) => ({

    upperBar: {
        display: "flex",
        position: "relative",
        justifyContent: "space-around",
        marginTop: theme.spacing(4),
    },
    backToMethod: {
        position: "absolute",
        left: 0,
        top: 0,
    },
    title: {

    }


}), {index: 1});