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
    }


}), {index: 1});