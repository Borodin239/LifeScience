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

const DeleteCategoryDialog: React.FC<CategoryDialogProps> = ({isOpen, onClose}) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).pop()
    const history = useHistory()
    const [, setAlertText] = useState<string | null>(null)

    const handleDeleteButton = () => {
        //preloader
        dispatch(deleteCategory(id!))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
        onClose()
    }

    return (
        <Dialog open={isOpen} onClose={onClose} classes={{paper: classes.paper}}>
            <DialogTitle>
                Are you sure you want to delete this category?
            </DialogTitle>
            <Box className={classes.twoButtonsPanel}>
                <Button className={classes.yesButton} onClick={handleDeleteButton}>
                    Yes
                </Button>
                <Button onClick={onClose} className={classes.noButton}>
                    No, go back
                </Button>
            </Box>
        </Dialog>
    )
}
export default DeleteCategoryDialog
