import {makeStyles} from "@material-ui/core/styles";


export const useProtocolPageStyles = makeStyles((theme) => ({
    upperBar: {
        position: "relative",
    },
    backButtonContainer: {
        position: "absolute",
        left: '0',
        top: '0',
        width: '20%',
    },
    protocolName: {
        position: "absolute",
        top: '0',
        left: '25%',
        width: '75%',
    }

}), {index: 1});
