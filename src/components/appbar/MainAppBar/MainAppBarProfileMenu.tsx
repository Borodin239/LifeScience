import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import React from "react";
import {useAppDispatch} from "../../../redux/hooks";
import {loggedOut} from "../../../redux/auth/slice"
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";

export const MainAppBarMenu_ID = 'primary-search-account-menu';

type MainAppBarProfileMenuProps = {
    anchorEl: HTMLElement | null,
    handleMenuClose: () => void
}

const MainAppBarProfileMenu: React.FC<MainAppBarProfileMenuProps> = (props) => {

    const isMenuOpen = Boolean(props.anchorEl);
    const dispatch = useAppDispatch();
    const history = useHistory()

    const handleProfileClick = () => {
        history.push(`${appRoutesNames.PROFILE}`)
        props.handleMenuClose()
    }

    return (
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={MainAppBarMenu_ID}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={props.handleMenuClose}
        >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={() => {dispatch(loggedOut()); props.handleMenuClose();}}>Logout</MenuItem>
        </Menu>
    )
};

export default MainAppBarProfileMenu;
