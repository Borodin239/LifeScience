import React from "react";
import {Box} from "@material-ui/core";
import {useWelcomePanelStyles} from "./useWelcomePanelStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import SearchTextField from "../../search/SearchTextField/SearchTextField";

const WelcomePanel = () => {
    const classes = useWelcomePanelStyles()
    const history = useHistory()
    const handleBrowseClick = () => {
        history.push(`${appRoutesNames.CATEGORIES}/`)
    }

    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.centerContainer}>
                <Typography variant={'h3'} className={classes.mainName}>
                    JetScience
                </Typography>
                <Typography variant={'h5'}>
                    is a platform to unite and speed up the science.
                </Typography>
                <Button onClick={handleBrowseClick} className={classes.browseButton}>
                    Browse the catalog
                </Button>
                <Typography variant={'h5'} className={classes.orText}>
                    or
                </Typography>
                <SearchTextField placeholder={"Search for method..."}/>
            </Box>
        </Box>
    )
}

export default WelcomePanel