import React, {useState} from "react";
import {useStyles} from "./admin-settings-styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CreateCategoryDialog from "../dialogs/CreateCategory/CreateCategoryDialog";
import RenameCategoryDialog from "../dialogs/RenameCategory/RenameCategoryDialog";
import {CategoryView} from "../../../../infrastructure/http/api/view/category/CategoryView";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../../../infrastructure/common/appRoutesNames";
import DeleteDialog from "../../../admin/dialogs/DeleteDialog";
import {deleteCategory} from "../../../../redux/categories/thunkActions";

const CategoryAdminSettings: React.FC<{
    categoryId: number, categoryName: string, setCategoryName: (categoryName: string) => void,
    updateCategoryCatalog: (categoryCatalog: CategoryView) => void, isVoid: boolean
}> = ({
          categoryId,
          categoryName,
          setCategoryName,
          updateCategoryCatalog,
          isVoid
      }) => {


    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const history = useHistory()

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
            <MenuItem onClick={handleMenuItemClick(setDeleteDialogOpen)}>Delete this category</MenuItem>
            <MenuItem onClick={handleMenuItemClick(setRenameDialogOpen)}>Rename this category</MenuItem>
            {isVoid &&
                <MenuItem onClick={(() => history.push(`${appRoutesNames.CREATE_APPROACH}/${categoryId}`))}>Create new
                    public approach</MenuItem>}
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
                                          onClose={handleDialogCloseClick(setCreateDialogOpen)}
                                          updateCategoryCatalog={updateCategoryCatalog}/>
                    <DeleteDialog id={categoryId} name={categoryName} type={'category'}
                                  onClose={handleDialogCloseClick(setDeleteDialogOpen)}
                                  isOpen={deleteDialogOpen} deleteType={deleteCategory}/>
                    <RenameCategoryDialog categoryId={categoryId} categoryName={categoryName} isOpen={renameDialogOpen}
                                          onClose={handleDialogCloseClick(setRenameDialogOpen)}
                                          setCategoryName={setCategoryName}/>
                </> : null
            }
        </>
    )
}

export default CategoryAdminSettings
