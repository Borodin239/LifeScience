import React from "react";
import {Box, Typography} from "@material-ui/core";
import {useUserInfoTextStyles} from "./useUserInfoTextStyles";

type UserInfoTextProps = {
    text: string | null,
}

const UserInfoText: React.FC<UserInfoTextProps> = ({text}) => {

    const classes = useUserInfoTextStyles()

    return (
        <Box>
            <Typography className={classes.text}>
                {text ?? 'unknown'}
            </Typography>
        </Box>
    )
}

export default UserInfoText