import {makeStyles} from "@material-ui/core/styles";

const spaceWidth = 0.3
const spaceHeight = 2.5

const middleFontSize = '20px'
const sideBarWidth = '20%'

const sectionSelectionMark = (theme: any) => {
    return {
        width: theme.spacing(spaceWidth),
        height: theme.spacing(spaceHeight),
        marginRight: theme.spacing(1),
    }
}

export const useMethodPageStyles = makeStyles((theme) => ({
    breadCrumbs: {
        margin: theme.spacing(3, 0, 2)
    },
    mainContainer: {
        position: "relative",
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
    },
    contentContainer: {
        width: '75%',
    },
    leftSideBar: {
        width: sideBarWidth,
    },
    rightSideBar: {
        width: sideBarWidth,
    },
    sectionsTitle: {
        fontSize: middleFontSize,
    },
    contentTitle: {
        fontSize: middleFontSize,
    },
    selectedSectionSpace: {
        ...sectionSelectionMark(theme),
        backgroundColor: theme.palette.primary.main
    },
    notSelectedSectionSpace: {
        ...sectionSelectionMark(theme),
        backgroundColor: theme.palette.common.white,
        // '& + $sectionName' : {
        //     backgroundColor: 'green',
        // }
    },
    content: {
        marginTop: theme.spacing(1),
        '& img': {
            width: '100%',
        },
        '& blockquote': {
            margin: 0,
            borderLeft: '3px solid ' + theme.palette.primary.main,
            paddingLeft: theme.spacing(4),
        },
        '& table': {
            marginTop: theme.spacing(2),
            tableLayout: 'fixed',
            width: '100%',
            borderCollapse: 'collapse',
            '& th, td': {
                padding: theme.spacing(2),
                border: '1px solid ' + theme.palette.primary.main,
            },
            '& th': {
                fontWeight: '500'
            }
        }
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
    },
    sectionList: {
        marginLeft: theme.spacing(1),
    },
    sectionName: {
        cursor: "pointer",
        '&:hover' : {
            textDecoration: 'underline',
        },
    },
    methodTitleContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    mainLoader: {
        marginTop: theme.spacing(2),
    },
    contentLoader: {
        marginTop: theme.spacing(5),
    },
    protocolsButtonContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "200px",
    }

}), {index: 1});