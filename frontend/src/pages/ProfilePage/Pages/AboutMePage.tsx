import {Box, Divider, List, ListItem, Typography} from "@material-ui/core";
import UserInfoTitle from "../../../components/profile/UserInfoTitle/UserInfoTitle";
import UserInfoText from "../../../components/profile/UserInfoText/UserInfoText";
import { UserInfoView } from "../../../infrastructure/http/api/view/social/user/UserInfoView";

// TODO :: возможность редактирования
// @ts-ignore
export const AboutMePage = (userInfo: UserInfoView | null, classes) => {
    return (
        <Box className={classes.aboutMePage}>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'} >
                    About me
                </Typography>
                <Divider className={classes.divider}/>
            </Box>
            <Box style={{marginLeft: "10px"}}>
                <Box className={classes.infoListContainer}>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'First name:'}/>
                        <UserInfoText text={userInfo?.personalData.firstName}/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Last name:'}/>
                        <UserInfoText text={userInfo?.personalData.lastName}/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Email:'}/>
                        <UserInfoText text={userInfo?.email}/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Roles:'}/>
                        <UserInfoText text={userInfo ? userInfo.roles.join(', ') : ''}/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Place of current employment:'}/>
                        <UserInfoText text="abs"/>
                    </Box>
                    <Box className={classes.infoRow}>
                        <UserInfoTitle title={'Country:'}/>
                        <UserInfoText text="abs"/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}