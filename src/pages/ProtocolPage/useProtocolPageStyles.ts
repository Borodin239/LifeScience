import {makeStyles} from "@material-ui/core/styles";


export const useProtocolPageStyles = makeStyles((theme) => ({
    upperBar: {
        position: "relative",
        display: "flex",
        justifyContent: "start",
        marginTop: theme.spacing(3),
    },
    backButtonContainer: {
        width: '20%',
    },
    protocolName: {
        marginLeft: '5%',
        width: '75%',
    },
    protocolContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
    },
    loader: {
        marginTop: theme.spacing(2),
    }


}), {index: 1});
