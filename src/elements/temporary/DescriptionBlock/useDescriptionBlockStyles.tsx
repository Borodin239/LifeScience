import {makeStyles} from "@material-ui/core/styles";

const smallFontSize = '20px'
const bigFontSize = '27px'

export const useDescriptionBlockStyles = makeStyles((theme) => ({
    info: {
        fontSize: bigFontSize,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: theme.spacing(1, 1, 1, 1),
        marginTop: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
    },
    warning: {
        fontSize: smallFontSize,
    },
    smallInfo: {
        fontSize: smallFontSize,
        backgroundColor: 'black',
        color: 'white',
    },


}));