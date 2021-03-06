import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {Box} from "@material-ui/core";
import React from "react";
import {useProtocolsArrowStyles} from "./useProtocolsArrowStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";


type ProtocolsArrowProps = {
    text: string,
    handleClick: () => void,
}

export const RightProtocolsArrow: React.FC<ProtocolsArrowProps> = ({text, handleClick}) => {
    const classes = useProtocolsArrowStyles()

    return (
        <Box className={`${classes.container} ${classes.rightContainer}`} onClick={handleClick}>
            <Typography className={classes.text}>
                {text}
            </Typography>
            <ArrowForwardIcon fontSize={"small"}
                              className={`${classes.arrow} ${classes.rightArrow}`}/>
        </Box>
    )
}

export const LeftProtocolsArrow: React.FC<ProtocolsArrowProps> = ({handleClick, text}) => {
    const classes = useProtocolsArrowStyles()

    return (
        <Box className={`${classes.container} ${classes.leftContainer}`} onClick={handleClick}>
            <ArrowBackIcon fontSize={"small"}
                           className={`${classes.arrow} ${classes.leftArrow}`}/>
            <Typography className={classes.text}>
                {text}
            </Typography>
        </Box>
    )
}
