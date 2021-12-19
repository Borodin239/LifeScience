import React, {MouseEvent, useState} from "react";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";
import {updateUserData} from "../../../../../redux/users/thunkActions";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../../../redux/utils/handleThunkErrorBase";
import {createCategory} from "../../../../../redux/categories/thunkActions";
import {CreateCategoryDto} from "../../../../../infrastructure/http/api/dto/category/CreateCategoryDto";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";

export type CategoryDialogProps = {
    isOpen: boolean,
    categoryId: number,
    onClose: () => void,
}
//todo move this type somewhere

const CreateCategoryDialog: React.FC<CategoryDialogProps> = (props) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const [, setAlertText] = useState<string | null>(null)
    const [categoryName, setCategoryName] = useState<string>('')
    const history = useHistory()
    const parentId = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).reverse()[1]

    const handleCreateClick = () => {
        //preloader
        dispatch(createCategory({
            name: categoryName,
            aliases: [
                {
                    alias: "string"
                }
            ],
            initialParentId: parentId!
        }))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
        props.onClose()
    }

    return (
        <Dialog open={props.isOpen} onClose={props.onClose} classes={{paper: classes.paper}}>
            <DialogTitle>Create new category</DialogTitle>
            <TextField variant='outlined' placeholder={"Enter category name"} onChange={(e) => setCategoryName(e.target.value)}/>
            <Button className={classes.submit} onClick={() => handleCreateClick()}>Create</Button>
        </Dialog>
    )
}
export default CreateCategoryDialog
