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
        width: '20%',
    },
    protocols: {
        display: "flex",
        justifyContent: "space-around",
    },
    title: {
        padding: theme.spacing(0, 3, 0, 3),
        borderBottom: "1px solid " + theme.palette.primary.main,
    },
    protocolName: {
        cursor: "pointer",
        fontSize: '18px',
    },
    mainContainer: {
        marginTop: theme.spacing(2),
        position: "relative",
    },
    addProtocol: {
        position: "absolute",
        left: 0,
        top: theme.spacing(2),
    },
    protocolBarContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid " + theme.palette.primary.main,
        width: "100%",
    },
    createFromExistingButton: {
        color: theme.palette.primary.main,
    }


}), {index: 1});