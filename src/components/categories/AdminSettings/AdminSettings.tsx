import React from "react";
import {useStyles} from "./admin-settings-styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const AdminSettings = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Create new category</MenuItem>
            <MenuItem onClick={handleMenuClose}>Delete this category</MenuItem>
        </Menu>
    )

    return (
        <>
            <IconButton onClick={handleSettingsOpen} className={classes.dots}>
                <MoreVertIcon />
            </IconButton>
            {renderMenu}
        </>
    )


}

export default AdminSettings