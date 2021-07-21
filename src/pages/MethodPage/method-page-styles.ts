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

export const useStyles = makeStyles((theme) => ({
    breadCrumbs: {
        margin: theme.spacing(3, 0, 2)
    },
    mainContainer: {
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
    goToProtocols: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        '&:hover': {
            // "& + $divider" : {
            //     backgroundColor: theme.palette.primary.dark,
            // },
            "& $protocolsArrow" : {
                transform: 'translateX(10px)'
            },
            // "& $goProtocolsText": {
            //     color: theme.palette.primary.dark,
            // }
        },
        marginRight: '20px',
        padding: theme.spacing(0, 1, 0.2, 1),
        borderLeft: "1px solid " + theme.palette.primary.main,
        borderBottom: "1px solid " + theme.palette.primary.main,
    },
    goProtocolsText: {
        fontSize: middleFontSize,
        // color: theme.palette.primary.main,
    },
    methodTitleContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    protocolsArrow: {
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(1),
        transitionProperty: 'transform',
        transitionDuration: '0.3s',
    },
    mainLoader: {
        marginTop: theme.spacing(2),
    }

}));