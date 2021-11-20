import {Box, Divider, List, ListItem, TextField, Typography} from "@material-ui/core";
import UserInfoTitle from "../../../components/profile/UserInfoTitle/UserInfoTitle";
import UserInfoText from "../../../components/profile/UserInfoText/UserInfoText";
import {UserInfoView} from "../../../infrastructure/http/api/view/social/user/UserInfoView";
import BaseTextField from "../../../elements/text-fields/BaseTextField";
import React from "react";
import SubmitButton from "../../../elements/buttons/SubmitButton";
import {useProfilePageStyles} from "../useProfilePageStyles";

export const AboutMePage = (userInfo: UserInfoView | null) => {
    // const [test, setTest] =
    const classes = useProfilePageStyles()

    // @ts-ignore
    return (
        // <Box className={classes.aboutMePage}>
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
                               defaultValue={userInfo == null ? "" : userInfo.personalData.lastName}
                />

                <BaseTextField label="Email"
                               name="Email"
                               defaultValue="Email"
                />

                <UserInfoTitle title={'Place of current employment:'}/>
                <BaseTextField label="TODO"
                               name="TODO"
                               handleChange={() => 1 + 1}/>

                <UserInfoTitle title={'Country:'}/>
                <BaseTextField label="Russia"
                               name="Russia"
                               handleChange={() => 1 + 1}/>

                <SubmitButton text={"Save change"} className={classes.button}/>
            </Box>
        </form>
        // {/*// </Box>*/}
    )
}