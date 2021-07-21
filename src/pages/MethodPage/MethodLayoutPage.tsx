import {Box, Divider, List, ListItem} from "@material-ui/core";
import Location from "../../components/categories/location";
import {generalInfoText, locationList} from "./temporaryConstants";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import {useMethodPageStyles} from "./method-page-styles";


const MethodLayoutPage = () => {
    const classes = useMethodPageStyles()

    return  (
        <Box>
            <Box className={classes.breadCrumbs}>
                <Location locationList={locationList}/>
            </Box>
            <Box className={classes.methodTitleContainer}>
                <Typography variant={"h5"}>
                    Bradford assay
                </Typography>
                <Box>
                    <Box className={classes.goToProtocols}>
                        <Typography className={classes.goProtocolsText}>
                            Go to protocols
                        </Typography>
                        <ArrowForwardIcon fontSize={"small"} className={classes.protocolsArrow}/>
                    </Box>
                    {/*<Divider className={classes.divider}/>*/}
                </Box>
            </Box>
            <Box className={classes.mainContainer}>
                <Box className={classes.leftSideBar}>
                    <Typography className={classes.sectionsTitle}>
                        Sections
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Box className={classes.sectionList}>
                        <List>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    Unselected value
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.selectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    Selected value
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    General information
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    Application
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    Find collaboration
                                </Typography>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
                <Box className={classes.contentContainer}>
                    <Box>
                        <Box>
                            <Typography className={classes.contentTitle}>
                                General information
                            </Typography>
                            <Divider style={{width: '35%'}} className={classes.divider}/>
                        </Box>
                        <Typography className={classes.content}>
                            {generalInfoText}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default MethodLayoutPage