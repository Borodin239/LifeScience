import React from "react";
import {Box, Divider, List, ListItem} from "@material-ui/core";
import Location from "../../components/categories/location";
import {locationList} from "../CategoryPage/categoryPage";
import {useStyles} from "./method-page-styles";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

type SectionTitle = {
    id: number,
    name: string,
}

type ProtocolTitle = {
    id: number,
    name: string,
}

type MethodPageProps = {
    name?: string,
    sections?: SectionTitle[],
    protocols?: ProtocolTitle[],
}
// this is a layout - real method page is not going to be so dumbly written
const MethodPage: React.FC<MethodPageProps> = (props) => {
    const classes = useStyles()

    const sectionNames = ["General information", "Application", "Advantages and disadvantages"]

    const generalInfoText = "Method for quantify the protein content in sample. This method has multiple applications in experimental sciences. Chemical basis of the Bradford method (1976) is based on the absorbance shift observed in an acidic solution of dye Coomassie® Brilliant Blue G-250. When added to a solution of protein, the dye binds to the protein resulting in a colour change from a reddish brown to blue. References: 1.Bradford MM A rapid and sensitive method for the quantitation of microgram quantities of protein utilizing the principle of protein-dye binding. // Analytical Biochemistry. 1976. № 72. С. 248-254. 2.Pedrol, Nuria & Tamayo, Pilar. (2001). Protein Content Quantification by Bradford Method. 10.1007/0-306-48057-3_19."

    const mainContainerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
    }

    const mainContentStyles = {
        width: '50%',
    }

    const rightSideBarStyles = {
        width: '20%',
    }

    return (
        <Box>
            <Box className={classes.breadCrumbs}>
                <Location locationList={locationList}/>
            </Box>
            <Box>
                <Typography variant={"h5"}>
                    Bradford assay
                </Typography>
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
                                <Typography  className={classes.sectionName}>
                                    Selected value
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography  className={classes.sectionName}>
                                    General information
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography  className={classes.sectionName}>
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
                <Box className={classes.rightSideBar}>
                    <Box className={classes.goToProtocols}>
                        <Typography className={classes.goProtocolsText}>
                            Go to protocols
                        </Typography>
                        <ArrowForwardIcon fontSize={"small"} style={{marginLeft: '10px'}}/>
                    </Box>
                    <Divider className={classes.divider}/>
                    <Box className={classes.hiddenSectionList}>
                        <List>
                            <ListItem>
                                <Typography className={classes.sectionName}>
                                    Article 1
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography className={classes.sectionName}>
                                    Article 2
                                </Typography>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MethodPage