import React, {useState} from "react";
import {useStyles} from "./admin-settings-styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CreateCategoryDialog from "../dialogs/CreateCategory/CreateCategoryDialog";
import DeleteCategoryDialog from "../dialogs/DeleteCategory/DeleteCategoryDialog";
import RenameCategoryDialog from "../dialogs/RenameCategory/RenameCategoryDialog";

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

    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [renameDialogOpen, setRenameDialogOpen] = useState(false)

    const handleMenuItemClick = (setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
        setDialogOpen(true)
    }

    const handleDialogCloseClick = (setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
        setDialogOpen(false)
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuItemClick(setCreateDialogOpen)}>Create new category</MenuItem>
            <MenuItem onClick={handleMenuItemClick(setDeleteDialogOpen)}>Delete this category</MenuItem>
            <MenuItem onClick={handleMenuItemClick(setRenameDialogOpen)}>Rename this category</MenuItem>
        </Menu>
    )

    return (
        <>
            <IconButton onClick={handleSettingsOpen} className={classes.dots}>
                <MoreVertIcon />
            </IconButton>
            {renderMenu}
            <CreateCategoryDialog open={createDialogOpen} onClose={handleDialogCloseClick(setCreateDialogOpen)}/>
            <DeleteCategoryDialog open={deleteDialogOpen} onClose={handleDialogCloseClick(setDeleteDialogOpen)}/>
            <RenameCategoryDialog open={renameDialogOpen} onClose={handleDialogCloseClick(setRenameDialogOpen)}/>
        </>
    )


}

export default AdminSettings