import React from "react";
import {Box, Divider} from "@material-ui/core";
import {useInfoPanelStyles} from "./useInfoPanelStyles";
import Typography from "@material-ui/core/Typography";

const InfoPanel = () => {
    const classes = useInfoPanelStyles()

    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.welcomeLabelContainer}>
                <Typography variant={'h4'}>
                    It's <span className={classes.US}><span style={{color: '#FA5C5B'}}>U</span>S</span> who make science
                </Typography>
            </Box>
        </Box>
    )
}

export default InfoPanel