import {makeStyles} from "@material-ui/core/styles";

const useApproachNodeStyles = makeStyles((theme) => ({
        container: {
            padding: theme.spacing(2)
        },
        headLine: {
            fontSize: 'x-large',
            fontWeight: 'bold',
            cursor: "pointer",
            '&:hover': {
                textDecoration: "underline",
            },
            userSelect: "none",
            paddingBottom: 1
        },
        iconRoot: {
            textAlign: 'center',
        },
        addIcon: {
            textAlign: 'center',
            cursor: "pointer",
        },
        imageIcon: {
            display: 'flex',
            height: 'inherit',
            width: 'inherit',
            marginRight: '5px',
            alignSelf: 'flex-start'
        },
        iconAndApproachName: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }
    }
), {index: 1});

export default useApproachNodeStyles