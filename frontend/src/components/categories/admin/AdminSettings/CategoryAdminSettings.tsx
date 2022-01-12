import React, {useState} from "react";
import {useStyles} from "./admin-settings-styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CreateCategoryDialog from "../dialogs/CreateCategory/CreateCategoryDialog";
import DeleteCategoryDialog from "../dialogs/DeleteCategory/DeleteCategoryDialog";
import RenameCategoryDialog from "../dialogs/RenameCategory/RenameCategoryDialog";

const CategoryAdminSettings: React.FC<{ categoryId: number, categoryName: string }> = ({categoryId, categoryName}) => {
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
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
            classes={{paper: classes.menu}}
        >
            <MenuItem onClick={handleMenuItemClick(setCreateDialogOpen)}>Create new category</MenuItem>
            {/*todo add check that this category is empty*/}
            <MenuItem onClick={handleMenuItemClick(setDeleteDialogOpen)}>Delete this category</MenuItem>
            <MenuItem onClick={handleMenuItemClick(setRenameDialogOpen)}>Rename this category</MenuItem>
        </Menu>
    )

    return (
        <>
            {categoryId ?
                <>
                    <IconButton onClick={handleSettingsOpen} className={classes.dots}>
                        <MoreVertIcon/>
                    </IconButton>
                    {renderMenu}
                    <CreateCategoryDialog categoryId={categoryId} isOpen={createDialogOpen}
                                          onClose={handleDialogCloseClick(setCreateDialogOpen)}/>
                    <DeleteCategoryDialog categoryId={categoryId} categoryName={categoryName} isOpen={deleteDialogOpen}
                                          onClose={handleDialogCloseClick(setDeleteDialogOpen)}/>
                    <RenameCategoryDialog categoryId={categoryId} categoryName={categoryName} isOpen={renameDialogOpen}
                                          onClose={handleDialogCloseClick(setRenameDialogOpen)}/>
                </> : null
            }
        </>
    )
}

export default CategoryAdminSettings
