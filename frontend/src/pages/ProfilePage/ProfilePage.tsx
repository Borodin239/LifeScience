import {Box} from "@material-ui/core";
import {useProfilePageStyles} from "./useProfilePageStyles";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Router, useHistory, Link, Switch, Route, useRouteMatch} from "react-router-dom";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {useEffect, useState} from "react";
import {getUserDraftProtocols, updateCurrentUserThunk} from "../../redux/users/thunkActions";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {ProtocolTitleView} from "../../infrastructure/http/api/view/protocol/ProtocolTitleView";
import {PublicationsPage} from "./Pages/PublicationsPage";
import {AboutMePage} from "./Pages/AboutMePage";
import avatar from "../../images/male_profile_avatar.jpg"
import {CommunicationsPage} from "./Pages/CommunicationsPage";
import {NotificationsPage} from "./Pages/NotificationsPage";

const ProfilePage = () => {

    const history = useHistory()
    const dispatch = useAppDispatch()
    const classes = useProfilePageStyles()
    let {path, url} = useRouteMatch();

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

    return (
        <Router history={history}>
            <Box sx={{flexDirection: 'row'}}>

                <div style={{width: '100%'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            m: 5,
                        }}
                    >

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 2
                        }}>
                            <img src={avatar} className={classes.avatar}/>
                            <Link className={classes.button} to={`${url}/about-me`}>
                                About me
                            </Link>
                            <Link className={classes.button} to={`${url}/communication`}>
                                Communication
                            </Link>
                            <Link className={classes.button} to={`${url}/notifications`}>
                                Notifications
                            </Link>
                            <Link className={classes.button} to={`${url}/working-space`}>
                                Working space
                            </Link>
                            <Link className={classes.button} to={`${url}/my-publications`}>
                                My publications
                            </Link>
                        </Box>

                        <Switch>
                            <Box className={classes.pageBody} sx={{m: 2}}>
                                <Route exact path={`${path}/`}>
                                    <AboutMePage/>
                                </Route>
                                <Route path={`${path}/about-me`}>
                                    <AboutMePage/>
                                </Route>
                                <Route path={`${path}/communication`}>
                                    <CommunicationsPage/>
                                </Route>
                                <Route path={`${path}/notifications`}>
                                    <NotificationsPage/>
                                </Route>
                                <Route path={`${path}/working-space`}>
                                    <NotificationsPage/>
                                </Route>
                                <Route path={`${path}/my-publications`}>
                                    <PublicationsPage protocols={protocols}/>
                                </Route>
                            </Box>
                        </Switch>

                    </Box>
                </div>
            </Box>
        </Router>
    )
}

export default ProfilePage
