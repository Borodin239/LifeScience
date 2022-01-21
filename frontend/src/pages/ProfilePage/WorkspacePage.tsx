import {Box, Divider, Tab, Tabs} from "@material-ui/core";
import {useAppSelector} from "../../redux/hooks";
import {Router, useHistory, Link, Switch, Route, useRouteMatch} from "react-router-dom";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {useState} from "react";
import {PublicationsPage} from "./WorkspacePages/PublicationsPage";
import {CommunicationsPage} from "./WorkspacePages/CommunicationsPage";
import {NotificationsPage} from "./WorkspacePages/NotificationsPage";
import ProfilePage from "./WorkspacePages/ProfilePage";
import {WorkingSpacePage} from "./WorkspacePages/WorkingSpacePage";
import * as React from "react";

const WorkspacePage = () => {

    const [value, setValue] = useState(0);
    const history = useHistory()
    const {path, url} = useRouteMatch();
    const isAuthorized = useAppSelector(state => state.authReducer.isAuthorized);

    if (!isAuthorized) {
        history.replace(`${appRoutesNames.SIGN_IN}`)
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box flexGrow={1} p={2}>
            <Router history={history}>
                <Tabs centered value={value} variant="scrollable" onChange={handleChange} indicatorColor={"primary"} scrollButtons={'auto'}>
                    <Tab label="Profile" to={`${url}/profile`} component={Link}/>
                    <Tab label="Publications" to={`${url}/publications`} component={Link}/>
                    <Tab label="Communications" to={`${url}/communications`} component={Link}/>
                    <Tab label="Notifications" to={`${url}/notifications`} component={Link}/>
                    <Tab label="Working space" to={`${url}/working-space`} component={Link}/>
                </Tabs>

                <Divider light/>

                <Box flexGrow={1} p={1}>
                    <Switch>
                        <Route exact path={`${path}/`}>
                            <ProfilePage/>
                        </Route>
                        <Route path={`${path}/profile`}>
                            <ProfilePage/>
                        </Route>
                        <Route path={`${path}/communications`}>
                            <CommunicationsPage/>
                        </Route>
                        <Route path={`${path}/notifications`}>
                            <NotificationsPage/>
                        </Route>
                        <Route path={`${path}/working-space`}>
                            <WorkingSpacePage/>
                        </Route>
                        <Route path={`${path}/publications`}>
                            <PublicationsPage/>
                        </Route>
                    </Switch>
                </Box>
            </Router>
        </Box>
    )
}

export default WorkspacePage
