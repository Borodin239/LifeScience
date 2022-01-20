import {alpha, createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useSearchTextFieldStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchPaper: {
            marginTop: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
            margin: '0 80px 0 80px',
        },
        iconButton: {
            padding: theme.spacing(1),
            color: alpha(theme.palette.primary.dark, 0.85),
        },
        input: {
            flex: 1,
            marginRight: theme.spacing(2),
        }
    }),
    {index: 1});

export default useSearchTextFieldStyles
