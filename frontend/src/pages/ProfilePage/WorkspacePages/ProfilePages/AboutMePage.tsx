import {Box, Typography} from "@material-ui/core";
import UserInfoTitle from "../../../../components/profile/UserInfoTitle/UserInfoTitle";
import UserInfoText from "../../../../components/profile/UserInfoText/UserInfoText";
import {useProfilePageStyles} from "../../useProfilePageStyles";
import {useAppSelector} from "../../../../redux/hooks";

const AboutMePage = () => {

    const classes = useProfilePageStyles()
    const userInfo = useAppSelector(state => state.usersReducer.userInfo)

    return (
        <Box>
            <Typography variant={'h6'}>
                About me
            </Typography>

            {/*TODO :: show only non-void fields*/}
            {/*TODO :: current styles don't work properly with big texts*/}

            <Box className={classes.infoRow}>
                <UserInfoTitle title={'First name:'}/>
                <UserInfoText text={userInfo?.personalData.firstName}/>
            </Box>
            <Box className={classes.infoRow}>
                <UserInfoTitle title={'Last name:'}/>
                <UserInfoText text={userInfo?.personalData.lastName}/>
            </Box>
            <Box className={classes.infoRow}>
                <UserInfoTitle title={'About:'}/>
                <UserInfoText text={userInfo?.personalData.about}/>
            </Box>
            <Box className={classes.infoRow}>
                <UserInfoTitle title={'Email:'}/>
                <UserInfoText text={userInfo?.email}/>
            </Box>
            <Box className={classes.infoRow}>
                <UserInfoTitle title={'Doctoral degree:'}/>
                <UserInfoText text={userInfo!.personalData.doctorDegree ? "Y" : "N"}/>
            </Box>
            <Box className={classes.infoRow}>
                <UserInfoTitle title={'Academic degree:'}/>
                <UserInfoText text={userInfo!.personalData.academicDegree}/>
            </Box>
            <Box className={classes.infoRow}>
                <UserInfoTitle title={'Roles:'}/>
                <UserInfoText text={userInfo ? userInfo.roles.join(', ') : ''}/>
            </Box>
            <Box className={classes.infoRow}>
                <UserInfoTitle title={'Organisations:'}/>
                <UserInfoText text={"To be done..."}/>
                {/*<UserInfoText text={userInfo ? userInfo.personalData.organisations.join(', ') : ''}/>*/}
            </Box>
            <Box className={classes.infoRow}>
                <UserInfoTitle title={'Country:'}/>
                <UserInfoText text="abs"/>
            </Box>
        </Box>
    )
}

export default AboutMePage