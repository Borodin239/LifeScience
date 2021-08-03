import {Box, Divider, Typography} from "@material-ui/core";
import {useProfilePageStyles} from "./useProfilePageStyles";
import {useAppSelector} from "../../redux/hooks";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import UserInfoTitle from "../../components/profile/UserInfoTitle/UserInfoTitle";


const ProfilePage = () => {

    const history = useHistory()
    const classes = useProfilePageStyles()

    const userInfo = useAppSelector(state => state.usersReducer)

    if (userInfo === null) {
        history.push(`${appRoutesNames.SIGN_IN}`)
    }

    return (
        <Box>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'}>
                    My profile
                </Typography>
                <Divider className={classes.divider} style={{width: '20%'}}/>
            </Box>
            <Box className={classes.infoListContainer}>
                <Box>
                    <UserInfoTitle title={'First name'}/>
                </Box>
                <Box>
                    <UserInfoTitle title={'Last name'}/>
                </Box>
                <Box>
                    <UserInfoTitle title={'Email'}/>
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage
