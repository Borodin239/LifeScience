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

const DeleteCategoryDialog: React.FC<CategoryDialogProps> = (props) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const [alertText, setAlertText] = useState<string | null>(null)
    const parentId = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).reverse()[1]

    const handleDeleteButton = () => {
        dispatch(deleteCategory(props.categoryId.toString()))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => history.replace(`${apiConstants.routes.categories.INITIAL}/${parentId}`))
            .then(() => props.onClose())
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }

    return (
        <Dialog open={props.isOpen} onClose={() => {
            props.onClose();
            setAlertText(null)
        }} classes={{paper: classes.paper}}>
            <DialogTitle>
                Are you sure you want to delete "{props.categoryName}" category?
            </DialogTitle>
            <Box className={classes.twoButtonsPanel}>
                <Button className={classes.yesButton} onClick={handleDeleteButton}>
                    Yes
                </Button>
                <Button onClick={() => {
                    props.onClose();
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
