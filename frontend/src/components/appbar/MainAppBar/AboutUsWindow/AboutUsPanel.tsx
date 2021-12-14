import React from "react";
import {Box, Divider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useAboutUsPanelStyles} from "./useAboutUsPanelStyles";
import arrows from "../../../../images/AboutUsPageArrows.png";
import hat from "../../../../images/AboutUsPageHat.png";
import lens from "../../../../images/AboutUsPageLens.png";

const AboutUsPanel = () => {

    const classes = useAboutUsPanelStyles()
    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.welcomeLabelContainer}>
                <Typography variant={'h5'}>
                    We are glad to welcome you on the JetScience platform!
                </Typography>
            </Box>
            <Divider className={classes.divider}/>
            <Box>
                <Box>
                    <img src={lens} className={classes.imgStyles}/>
                    <Typography className={classes.textContainerImportant}>
                        SEARCH
                        <br/>
                        Find methods and protocols by name, object and application
                    </Typography>
                </Box>
                <img src={hat} className={classes.imgStyles}/>
                <Typography className={classes.textContainerImportant}>
                    STUDY
                    <br/>
                    Learn new methods and techniques
                </Typography>
                <img src={arrows} className={classes.imgStyles}/>
                <Typography className={classes.textContainerImportant}>
                    EXCHANGE
                    <br/>
                    Download existing protocol moderated by experts or upload a new one
                </Typography>
                <Typography className={classes.textContainer}>
                    Scientific method is a series of steps followed by scientific investigators to answer specific
                    questions about the object of interest.
                </Typography>
                <Typography className={classes.textContainer}>
                    Research protocol is a document that outlines the planning of your study.
                </Typography>
                <Typography className={classes.textContainer}>
                    Here you can find extensive information about various methods used in research and development:
                    theoretical information, protocols, troubleshooting, required equipment and reagents.
                </Typography>
                <Typography className={classes.textContainerImportant}>
                    Our goal is to make the process of finding and sharing information easier and make research more
                    accessible!
                </Typography>
            </Box>
        </Box>
    )
}

export default AboutUsPanel