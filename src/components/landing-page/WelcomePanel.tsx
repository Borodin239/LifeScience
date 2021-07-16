import React from "react";
import {Box} from "@material-ui/core";
import {useWelcomePanelStyles} from "./useWelcomePanelStyles";

const WelcomePanel = () => {
    const classes = useWelcomePanelStyles()

    return (
        <Box className={classes.mainContainer}>

        </Box>
    )
}
export default WelcomePanel