import React, {useCallback} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import {useAppSelector} from "../../../redux/hooks";
import useMainAppBarStyles from "./useMainAppBarStyles";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import MainAppBarProfileMenu from "./MainAppBarProfileMenu";
import MainSearch from "./MainSearch";
import UnauthorizedProfile from "./profile/UnauthorizedProfile";
import AuthorizedProfilePreview from "./profile/AuthorizedProfilePreview";


const MainAppBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const classes = useMainAppBarStyles();
    const history = useHistory();

    const isAuthorized = useAppSelector(state => state.authReducer.isAuthorized);


    const handleHomeClick = useCallback(() => {
        history.push(appRoutesNames.HOME);
    }, [history]);


    const handleProfileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, []);



    return (
        <div className={classes.main}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.homeLink}
                                variant="h6"
                                noWrap
                                onClick={handleHomeClick}>
                        JetScience
                    </Typography>

                    <MainSearch/>

                    <div className={classes.grow}/>

                    {isAuthorized ? <AuthorizedProfilePreview handleProfileMenuOpen={handleProfileMenuOpen}/> : <UnauthorizedProfile/>}
                </Toolbar>
            </AppBar>
            <MainAppBarProfileMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
        </div>
    );
}
export default MainAppBar
