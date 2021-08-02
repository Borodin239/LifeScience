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
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "space-around",
    },
    title: {
        padding: theme.spacing(0, 3, 0, 3),
        borderBottom: "1px solid " + theme.palette.primary.main,
    },
    protocolName: {
        cursor: "pointer",
        '&:hover': {
            textDecoration: "underline",
        },
        fontSize: '18px',
    }


}), {index: 1});