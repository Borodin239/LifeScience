import React, {MouseEvent, useState} from "react";
import {Dialog, DialogTitle, Snackbar, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";
import {updateUserData} from "../../../../../redux/users/thunkActions";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../../../redux/utils/handleThunkErrorBase";
import {createCategory} from "../../../../../redux/categories/thunkActions";
import {CreateCategoryDto} from "../../../../../infrastructure/http/api/dto/category/CreateCategoryDto";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";
import apiConstants from "../../../../../infrastructure/http/api/apiConstants";
import Alert from "@material-ui/lab/Alert";

export type CategoryDialogProps = {
    isOpen: boolean,
    categoryId: number,
    onClose: () => void,
}
//todo move this type somewhere

const CreateCategoryDialog: React.FC<CategoryDialogProps> = (props) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const [alertText, setAlertText] = useState<string | null>(null)
    const [categoryName, setCategoryName] = useState<string>('')
    const history = useHistory()

    const handleCreateClick = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(createCategory({
            name: categoryName.trim(),
            aliases: [
                {
                    alias: "string"
                }
            ],
            initialParentId: props.categoryId.toString()
        }))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => props.onClose())
            .then(() => document.location.reload())
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }

    return (
        // TODO :: fix onClose
        // TODO :: fix alert-window size
        <Dialog open={props.isOpen} onClose={() => { props.onClose(); setAlertText(null) }} classes={{paper: classes.paper}} style={{width: '100%'}}>
            <DialogTitle>Create new category</DialogTitle>
            <TextField variant='outlined' placeholder={"Enter category name"}
                       onChange={(e) => setCategoryName(e.target.value)}/>
            <Button className={classes.submit} onClick={(e) => handleCreateClick(e)}>Create</Button>
            {alertText &&
            <Alert severity="error" style={{marginTop: 10}}>
                {alertText}
            </Alert>}
        </Dialog>
    )
}
export default CreateCategoryDialog