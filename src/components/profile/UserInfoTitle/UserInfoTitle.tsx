import React from "react";
import {Box, Typography} from "@material-ui/core";
import {useUserInfoTitleStyles} from "./useUserInfoTitleStyles";


type UserInfoTitleProps = {
    title: string,
}

const UserInfoTitle: React.FC<UserInfoTitleProps> = ({title}) => {

    const classes = useUserInfoTitleStyles();

    return (
        <Box className={classes.titleContainer}>
            <Typography className={classes.title}>
                {title}
            </Typography>
        </Box>
    )
}

export default UserInfoTitle