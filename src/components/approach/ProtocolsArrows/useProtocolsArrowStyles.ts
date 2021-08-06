import {makeStyles} from "@material-ui/core/styles";

export const useProtocolsArrowStyles = makeStyles((theme) => ({

    text: {
        fontSize: '20px',
    },
    arrow: {
        color: theme.palette.primary.main,
        transitionProperty: 'transform',
        transitionDuration: '0.3s',
    },
    leftArrow: {
        marginRight: theme.spacing(1),
    },
    rightArrow: {
        marginLeft: theme.spacing(1),
    },
    container: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        paddingRight: theme.spacing(1),
        borderBottom: "1.5px solid " + theme.palette.primary.main,
        maxWidth: "fit-content",
    },
    leftContainer: {
        '&:hover': {
            "& $arrow" : {
                transform: 'translateX(-10px)'
            },
        },
        borderRight: "1px solid " + theme.palette.primary.main,
    },
    rightContainer: {
        '&:hover': {
            "& $arrow" : {
                transform: 'translateX(10px)'
            },
        },
    }

}), {index: 1});