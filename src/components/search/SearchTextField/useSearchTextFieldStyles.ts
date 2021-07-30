import {alpha, createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useSearchTextFieldStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchPaper: {
            margin: '0 auto',
            marginTop: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
            width: '500px',
        },
        iconButton: {
            padding: theme.spacing(1),
            color: alpha(theme.palette.primary.dark, 0.85),
        },
        input: {
            flex: 1,
        },
    }),
);

export default useSearchTextFieldStyles
