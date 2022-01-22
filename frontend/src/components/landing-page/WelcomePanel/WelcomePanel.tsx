import React from "react";
import {Box} from "@material-ui/core";
import {useWelcomePanelStyles} from "./useWelcomePanelStyles";

const WelcomePanel = () => {
    const classes = useWelcomePanelStyles()
    /*const history = useHistory()
    const handleBrowseClick = () => {
        history.push(`${appRoutesNames.CATEGORIES}/`)
    }*/

    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.centerContainer}>
                {/*<Button onClick={handleBrowseClick} className={classes.browseButton}>*/}
                {/*    Browse the catalog*/}
                {/*</Button>*/}
                {/*<Typography variant={'h5'} className={classes.orText}>*/}
                {/*    or*/}
                {/*</Typography>*/}
                {/*<SearchTextField placeholder={"Search for method..."}/>*/}
            </Box>
        </Box>
    )
}

export default WelcomePanel