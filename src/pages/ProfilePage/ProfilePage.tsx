import {Box, Divider, Typography} from "@material-ui/core";
import {useProfilePageStyles} from "./useProfilePageStyles";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import UserInfoTitle from "../../components/profile/UserInfoTitle/UserInfoTitle";
import UserInfoText from "../../components/profile/UserInfoText/UserInfoText";
import {useEffect} from "react";
import {updateCurrentUserThunk} from "../../redux/users/thunkActions";


const ProfilePage = () => {

    const history = useHistory()
    const dispatch = useAppDispatch()
    const classes = useProfilePageStyles()

    const isAuthorized = useAppSelector(state => state.authReducer.isAuthorized);

    useEffect(() => {
        if (isAuthorized) {
            dispatch(updateCurrentUserThunk());
        }
    }, [isAuthorized, dispatch]);


    if (!isAuthorized) {
        history.replace(`${appRoutesNames.SIGN_IN}`)
    }

    const userInfo = useAppSelector(state => state.usersReducer.userInfo)

    return (
        <Box>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'}>
                    My profile
                </Typography>
                <Divider className={classes.divider} style={{width: '20%'}}/>
            </Box>
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
            </Box>
        </Box>
    )
}

export default ProfilePage
