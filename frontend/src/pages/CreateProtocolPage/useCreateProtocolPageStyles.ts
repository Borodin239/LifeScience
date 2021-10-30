import {makeStyles} from "@material-ui/core/styles";

export const useCreateProtocolPageStyles = makeStyles((theme) => ({

    title: {
        fontSize: '22px',
        marginTop: theme.spacing(3),
    },
    editor: {
        marginTop: theme.spacing(2),
    },
    loader: {
        marginTop: theme.spacing(3),
    },
    submitButtonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
    },
    submitButton: {
        padding: theme.spacing(0, 2, 0, 2),
        fontSize: '18px',
        marginRight: theme.spacing(1),
    },
    protocolName: {
        marginBottom: '10px'
    }



}), {index: 1});