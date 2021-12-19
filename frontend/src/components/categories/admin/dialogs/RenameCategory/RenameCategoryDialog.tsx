import React, {MouseEvent, useState} from "react";
import {CategoryDialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";
import {updateCategory} from "../../../../../redux/categories/thunkActions";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../../../redux/utils/handleThunkErrorBase";

const RenameCategoryDialog: React.FC<CategoryDialogProps> = ({isOpen, onClose}) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const [, setAlertText] = useState<string | null>(null)
    const history = useHistory()
    const id = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).pop()

    const handleRenameClick = (e: MouseEvent<HTMLButtonElement>) => {
        //preloader
        dispatch(updateCategory({
            categoryInfo: {
                name: "string",
                aliases: [
                    {
                        alias: "string"
                    }
                ],
                parentsToAdd: [
                    0
                ],
                parentsToDelete: [
                    0
                ]
            }, id:  id!
        }))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message); // TODO :: do I need this?
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
        onClose()
    }

    return (
        <Dialog open={isOpen} onClose={onClose} classes={{paper: classes.paper}}>
            <DialogTitle>Rename category</DialogTitle>
            <TextField variant="outlined" placeholder="Enter new name"/>
            <Button className={classes.submit} onClick={handleRenameClick}>Rename</Button>
        </Dialog>
    )
}
export default RenameCategoryDialog
