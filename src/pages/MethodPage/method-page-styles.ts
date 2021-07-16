import {makeStyles} from "@material-ui/core/styles";

const spaceWidth = 0.3
const spaceHeight = 2

const middleFontSize = '22px'

export const useStyles = makeStyles((theme) => ({
    breadCrumbs: {
        margin: theme.spacing(3, 0, 2)
    },
    sectionName: {
        marginTop: theme.spacing(1),
    },
    mainContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
    },
    contentContainer: {
        width: '50%',
    },
    sectionsTitle: {
        fontSize: middleFontSize,
    },
    contentTitle: {
        fontSize: middleFontSize,
    },
    selectedSectionSpace: {
        width: theme.spacing(spaceWidth),
        height: theme.spacing(spaceHeight),
        backgroundColor: theme.palette.primary.main,
        marginRight: theme.spacing(1),
    },
    notSelectedSectionSpace: {
        width: theme.spacing(spaceWidth),
        height: theme.spacing(spaceHeight),
        backgroundColor: theme.palette.common.white,
        marginRight: theme.spacing(1),
    },
    content: {
        marginTop: theme.spacing(1),
    }

}));