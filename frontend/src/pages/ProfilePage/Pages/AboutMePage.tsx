import {Box, Divider, Typography} from "@material-ui/core";
import BaseTextField from "../../../elements/text-fields/BaseTextField";
import React from "react";
import SubmitButton from "../../../elements/buttons/SubmitButton";
import {useProfilePageStyles} from "../useProfilePageStyles";
import {useAppSelector} from "../../../redux/hooks";

export const AboutMePage = () => {
    const classes = useProfilePageStyles()
    const userInfo = useAppSelector(state => state.usersReducer.userInfo)

    return (
        <form onSubmit={() => 1 + 1} noValidate>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'} style={{marginBottom: '5px'}}>
                    About me
                </Typography>
                <Divider className={classes.divider}/>
            </Box>
            <Box style={{marginLeft: "10px"}}>
                <BaseTextField label="First name"
                               name="firstName"
                               defaultValue={userInfo == null ? "" :
                                   userInfo.personalData.firstName}
                />

                <BaseTextField label="Last name"
                               name="Last name"
                               defaultValue={userInfo == null ? "" :
                                   userInfo.personalData.lastName}
                />

                <BaseTextField label="Email"
                               name="Email"
                               defaultValue="Email"
                />

                <BaseTextField label="Place of current employment"
                               name="Place of current employment"
                               defaultValue="JetBrains"
                />

                <BaseTextField label="Country"
                               name="Country"
                               defaultValue="Russia"
                />

                <SubmitButton text={"Save change"} className={classes.button}/>
            </Box>
        </form>
    )
}