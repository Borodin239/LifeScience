import {Box, Divider, List, ListItem, Typography} from "@material-ui/core";
import UserInfoTitle from "../../../components/profile/UserInfoTitle/UserInfoTitle";
import UserInfoText from "../../../components/profile/UserInfoText/UserInfoText";
import { UserInfoView } from "../../../infrastructure/http/api/view/social/user/UserInfoView";
import BaseTextField from "../../../elements/text-fields/BaseTextField";
import React from "react";

// TODO :: возможность редактирования
// @ts-ignore
export const AboutMePage = (userInfo: null | UserInfoView, classes) => {
    return (
        <Box className={classes.aboutMePage}>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'} style={{marginBottom:'5px'}}>
                    About me
                </Typography>
                <Divider className={classes.divider}/>
            </Box>
            <Box style={{marginLeft: "10px"}}>
                <UserInfoTitle title={'First name:'}/>
                <BaseTextField label={userInfo?.personalData.firstName == null ? "" : userInfo?.personalData.firstName}
                               name={userInfo?.personalData.firstName == null ? "" : userInfo?.personalData.firstName}
                               handleChange={() => 1+1}/>

                <UserInfoTitle title={'Last name:'}/>
                <BaseTextField label={userInfo?.personalData.lastName == null ? "" : userInfo?.personalData.lastName}
                               name={userInfo?.personalData.lastName == null ? "" : userInfo?.personalData.lastName}
                               handleChange={() => 1+1}/>

                    <UserInfoTitle title={'Email:'}/>
                <BaseTextField label="TODO"
                               name="TODO"
                               handleChange={() => 1+1}/>


                <UserInfoTitle title={'Place of current employment:'}/>
                <BaseTextField label="TODO"
                               name="TODO"
                               handleChange={() => 1+1}/>


                <UserInfoTitle title={'Country:'}/>
                <BaseTextField label="Russia"
                               name="Russia"
                               handleChange={() => 1+1}/>


            </Box>
        </Box>
    )
}