import {Box, Divider, List, ListItem, Typography} from "@material-ui/core";
import {useProfilePageStyles} from "./useProfilePageStyles";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {useEffect, useState} from "react";
import {getUserDraftProtocols, updateCurrentUserThunk} from "../../redux/users/thunkActions";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {ProtocolTitleView} from "../../infrastructure/http/api/view/protocol/ProtocolTitleView";
import {tmp2} from "./Pages/tmp2";
import {PublicationsPage} from "./Pages/PublicationsPage";
import {AboutMePage} from "./Pages/AboutMePage";
import avatar from "../../images/male_profile_avatar.jpg"


const ProfilePage = () => {

    const history = useHistory()
    const dispatch = useAppDispatch()
    const classes = useProfilePageStyles()

    const isAuthorized = useAppSelector(state => state.authReducer.isAuthorized);
    const userId = useAppSelector(state => state.usersReducer.userInfo?.id);

    const [protocols, setProtocols] = useState<ProtocolTitleView[]>([]);

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

    const [page, setPage] = useState(AboutMePage(userInfo));

    return (
        <Box sx={{flexDirection: 'row'}}>

            <div style={{width: '100%'}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        // p: 5,
                        m: 5,
                    }}
                >

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 2
                    }} >
                        <img src={avatar} className={classes.avatar}/>
                        <button className={classes.button} onClick={() => setPage(AboutMePage(userInfo))}>
                            About me
                        </button>
                        <button className={classes.button} onClick={() => setPage(tmp2)}>
                            Communication
                        </button>
                        <button className={classes.button} onClick={() => setPage(tmp2)}>
                            Notifications
                        </button>
                        <button className={classes.button} onClick={() => setPage(tmp2)}>
                            Working space
                        </button>
                        <button className={classes.button} onClick={() => setPage(PublicationsPage(classes, protocols, history))}>
                            My publications
                        </button>
                    </Box>

                    <Box className={classes.pageBody} sx={{m: 2}}>
                        {page}
                    </Box>

                </Box>
            </div>
        </Box>
    )
}

export default ProfilePage
