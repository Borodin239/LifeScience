import React from "react";
import {Box, Divider} from "@material-ui/core";
import {useInfoPanelStyles} from "./useInfoPanelStyles";
import Typography from "@material-ui/core/Typography";

const InfoPanel = () => {
    const classes = useInfoPanelStyles()

    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.welcomeLabelContainer}>
                <Typography variant={'h5'}>
                    We are glad to welcome you on the JetScience platform!
                </Typography>
            </Box>
            <Divider className={classes.divider}/>
            <Box className={classes.textContainer}>
                <Typography>
                    Here you can find extensive information about various methods used in research and development. You
                    can find the desired method using the search or through the catalog. For each method, general
                    theoretical information, troubleshooting, and required equipment and reagents are provided. Finally,
                    the platform contains actual and proven protocols presented in an apprehensible form!

                    Our platform provides you the opportunity to search for specialists for collaboration and the
                    opportunity to learn the techniques of your interest. The information on the platform is regularly
                    updated by the registered users - members of the scientific community. In addition, the platform
                    allows users to communicate with each other, unite in teams, and exchange data.

                    Our goal is to make scientific research more relevant, the process of finding and sharing
                    information - easier, and make research more accessible!

                    We invite you to join the platform community! Use and replenish the data with us!
                </Typography>
            </Box>
        </Box>
    )
}

export default InfoPanel