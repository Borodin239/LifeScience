import React, {useState} from "react";
import {CategoryDialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Box, Dialog, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {deleteCategory} from "../../../../../redux/categories/thunkActions";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../../../redux/utils/handleThunkErrorBase";
import {useHistory} from "react-router-dom";
import apiConstants from "../../../../../infrastructure/http/api/apiConstants";
import Alert from "@material-ui/lab/Alert";
import {pathMove} from "../../../../../redux/navigation/slice";
import {getRedirectionRoute} from "../../../../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";

const DeleteCategoryDialog: React.FC<CategoryDialogProps> = ({
                                                                 categoryId,
                                                                 onClose,
                                                                 isOpen,
                                                                 categoryName
                                                             }) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const [alertText, setAlertText] = useState<string | null>(null)
    const parentId = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).reverse()[1]
    const parentName = useAppSelector(state => state.navigationReducer.path).map(i => i.name).reverse()[1]

    const handleDeleteButton = () => {
        dispatch(deleteCategory(categoryId.toString()))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => dispatch(pathMove({
                name: parentName,
                route: getRedirectionRoute({type: 'category', categoryId: parentId!}),
                type: 'category'
            })))
            .then(() => history.replace(`${apiConstants.routes.categories.INITIAL}/${parentId}`))
            .then(() => onClose())
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }

    return (
        <Dialog open={isOpen} onClose={() => {
            onClose();
            setAlertText(null)
        }} classes={{paper: classes.paper}}>
            <DialogTitle>
                Are you sure you want to delete the "{categoryName}" category?
            </DialogTitle>
            <Box className={classes.twoButtonsPanel}>
                <Button className={classes.yesButton} onClick={handleDeleteButton}>
                    Yes
                </Button>
                <Button onClick={() => {
                    onClose();
                    setAlertText(null)
                }} className={classes.noButton}>
                    No, go back
                </Button>
            </Box>
            {alertText &&
                <Alert severity="error" style={{marginTop: 10}}>
                    {alertText}
                </Alert>}
        </Dialog>
    )
}
export default DeleteCategoryDialog
