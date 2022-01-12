import React, {useCallback, useEffect, useState} from "react";
import {CategoryDialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";
import {useAppDispatch} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";
import {getCategoryInfoThunk, updateCategory} from "../../../../../redux/categories/thunkActions";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../../../redux/utils/handleThunkErrorBase";
import Alert from "@material-ui/lab/Alert";
import {pathMove, ROOT_NAVIGATION_UNIT} from "../../../../../redux/navigation/slice";
import {getRedirectionRoute} from "../../../../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import {CategoryInfoView} from "../../../../../infrastructure/http/api/view/category/CategoryInfoView";

const RenameCategoryDialog: React.FC<CategoryDialogProps> = ({categoryId, categoryName, onClose, isOpen}) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const [alertText, setAlertText] = useState<string | null>(null)
    const history = useHistory()
    const [newName, setNewName] = useState<string>('')
    // const [currentCategoryName, setCategoryName] = useState<string>(categoryName!)

    const handleRenameClick = () => {
        dispatch(updateCategory({
            categoryInfo: {
                name: newName.trim(),
                aliases: [],
                parentsToAdd: [],
                parentsToDelete: []
            }, id: categoryId.toString()
        }))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => onClose())
            .then(() => dispatch(pathMove({
                name: newName,
                route: getRedirectionRoute({type: 'category', categoryId: categoryId.toString()}),
                type: 'category'
            })))
            .then(() => categoryName=newName)
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }

    // const tmp = useCallback(() =>
    //       dispatch(getCategoryInfoThunk(categoryId))
    //         .unwrap()
    //         .then(payload => splitThunkPayload(payload))
    //         .then(() => alert(newName))
    //         .catch(thunkError => {
    //             // setIsCategoryLoading(false);
    //             if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 404) {
    //                 history.push(ROOT_NAVIGATION_UNIT.route);
    //             } else {
    //                 handleThunkErrorBase(thunkError, history, dispatch);
    //             }
    //         }), [dispatch])
    // // useEffect(() =>
    // // tmp(), [tmp])

    return (
        <Dialog open={isOpen} onClose={() => {
            onClose();
            setAlertText(null)
        }} classes={{paper: classes.paper}}>
            <DialogTitle>Rename "{categoryName}" category</DialogTitle>
            <TextField variant="outlined" placeholder="Enter new name" onChange={(e) =>
                setNewName(e.target.value)
            }/>
            <Button className={classes.submit} onClick={handleRenameClick}>Rename</Button>
            {alertText &&
            <Alert severity="error" style={{marginTop: 10}}>
                {alertText}
            </Alert>}
        </Dialog>
    )
}
export default RenameCategoryDialog