import {Box, Divider, List, ListItem, Typography} from "@material-ui/core";
import {useProfilePageStyles} from "./useProfilePageStyles";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import UserInfoTitle from "../../components/profile/UserInfoTitle/UserInfoTitle";
import UserInfoText from "../../components/profile/UserInfoText/UserInfoText";
import {useEffect, useState} from "react";
import {getUserDraftProtocols, updateCurrentUserThunk} from "../../redux/users/thunkActions";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {ProtocolTitleView} from "../../infrastructure/http/api/view/protocol/ProtocolTitleView";


const ProfilePage = () => {

    const history = useHistory()
    const dispatch = useAppDispatch()
    const classes = useProfilePageStyles()

    const isAuthorized = useAppSelector(state => state.authReducer.isAuthorized);
    const userId = useAppSelector(state => state.usersReducer.userInfo?.id);

    const [protocols, setProtocols] = useState<ProtocolTitleView[]>([]);

    const handleDraftProtocolClick = (id: string) => () => {
        history.push(`${appRoutesNames.DRAFT_PROTOCOLS}/${id}`)
    }

    useEffect(() => {
        if (isAuthorized) {
            dispatch(updateCurrentUserThunk());
        }
        if (userId) {
            dispatch(getUserDraftProtocols({userId: userId}))
                .unwrap()
                .then(payload => splitThunkPayload(payload))
                .then(payload => setProtocols(payload))
                .catch(thunkError => {
                    handleThunkErrorBase(thunkError, history, dispatch);
                });
        }
    }, [isAuthorized, dispatch, history, userId]);


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
                </Box>
                <Box className={classes.protocolsPanel}>
                    <Box>
                        <Typography className={classes.protocolsTitle}>
                            My draft protocols:
                        </Typography>
                    </Box>
                    <Box style={{marginLeft: "5px"}}>
                        <List>
                            {
                                protocols.map((protocol, index) => (
                                    <ListItem key={index}>
                                        <Typography onClick={handleDraftProtocolClick(protocol.id)}
                                        className={classes.protocolTitle}>
                                            {protocol.name}
                                        </Typography>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage
