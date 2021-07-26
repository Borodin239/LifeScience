import React from "react";
import {Box} from "@material-ui/core";
import {useWelcomePanelStyles} from "./useWelcomePanelStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import {getFullWidthStyling} from "../../../infrastructure/common/fullWidthStyler";
import SearchTextField from "../../search/SearchTextField/SearchTextField";

const WelcomePanel = () => {
    const classes = useWelcomePanelStyles()
    const history = useHistory()
    const handleBrowseClick = () => {
        history.push(`${appRoutesNames.CATEGORIES}/`)
    }

    return (
        <Box className={classes.mainContainer} style={getFullWidthStyling()}>
            <Box className={classes.centerContainer}>
                <Typography variant={'h3'} className={classes.mainName}>
                    JetScience
                </Typography>
                <Typography variant={'h5'}>
                    is a simple and easy-to-use
                    catalog of research methods.
                </Typography>
                <Button onClick={handleBrowseClick} className={classes.browseButton}>
                    Browse the catalog
                </Button>
                <Typography variant={'h5'} className={classes.orText}>
                    or
                </Typography>
                <SearchTextField/>
            </Box>
        </Box>
    )
}
export default WelcomePanel
