import {Box} from "@material-ui/core";
import {useProfilePageStyles} from "../useProfilePageStyles";
import {Router, useHistory, Link, Switch, Route, useRouteMatch} from "react-router-dom";
import {SettingsPage} from "./ProfilePages/SettingsPage";
import avatar from "../../../images/male_profile_avatar.jpg"
import {CredentialsPage} from "./ProfilePages/CredentialsPage";
import AboutMePage from "./ProfilePages/AboutMePage";

const ProfilePage = () => {

    const history = useHistory()
    const classes = useProfilePageStyles()
    const {path, url} = useRouteMatch();

    return (
        <Router history={history}>
            <Box m={5} display={"flex"}>
                <Box flexBasis={"column"}>
                    <img src={avatar} className={classes.avatar} alt={'avatar'}/>
                    <Link className={classes.button} to={`${url}/info`}>
                        About me
                    </Link>
                    <Link className={classes.button} to={`${url}/settings`}>
                        Settings
                    </Link>
                    <Link className={classes.button} to={`${url}/credentials`}>
                        Credentials
                    </Link>
                </Box>

                <Switch>
                    <Box paddingLeft={'50px'}>
                        <Route exact path={`${path}/`}>
                            <AboutMePage/>
                        </Route>
                        <Route path={`${path}/info`}>
                            <AboutMePage/>
                        </Route>
                        <Route path={`${path}/settings`}>
                            <SettingsPage/>
                        </Route>
                        <Route path={`${path}/credentials`}>
                            <CredentialsPage/>
                        </Route>
                    </Box>
                </Switch>
            </Box>
        </Router>
    )
}

export default ProfilePage
