import {useMethodPageStyles} from "../../../pages/MethodPage/method-page-styles";
import {Box, Divider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {generalInfoText} from "../../../pages/MethodPage/temporaryConstants";
import React from "react";


type ContentContainerProps = {
    title: string,
    // sectionId: string,
}

const ContentContainer: React.FC<ContentContainerProps> = ({title}) => {
    const classes = useMethodPageStyles();

    return (
        <Box className={classes.contentContainer}>
            <Box>
                <Box>
                    <Typography className={classes.contentTitle}>
                        {title}
                    </Typography>
                    <Divider style={{width: '35%'}} className={classes.divider}/>
                </Box>
                <Typography className={classes.content}>
                    {generalInfoText}
                </Typography>
            </Box>
        </Box>
    )
}

export default ContentContainer