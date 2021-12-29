import React, {useState} from "react";
import {CategoryDialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";
import {updateCategory} from "../../../../../redux/categories/thunkActions";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../../../redux/utils/handleThunkErrorBase";
import Alert from "@material-ui/lab/Alert";
import apiConstants from "../../../../../infrastructure/http/api/apiConstants";

const RenameCategoryDialog: React.FC<CategoryDialogProps> = ({isOpen, onClose}) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const [alertText, setAlertText] = useState<string | null>(null)
    const history = useHistory()
    const id = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).pop()
    const [newName, setNewName] = useState<string>('')
    const parentId = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).reverse()[1]

    const handleRenameClick = () => {
        dispatch(updateCategory({
            categoryInfo: {
                name: newName.trim(),
                aliases: [],
                parentsToAdd: [],
                parentsToDelete: []
            }, id: id!
        }))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => onClose())
            .then(() => history.replace(`${apiConstants.routes.categories.INITIAL}/${parentId}`)) // TODO
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }

    return (
        <Dialog open={isOpen} onClose={() => { onClose(); setAlertText(null) }} classes={{paper: classes.paper}}>
            <DialogTitle>Rename category</DialogTitle>
            <TextField variant="outlined" placeholder="Enter new name" onChange={(e) => setNewName(e.target.value)}/>
            <Button className={classes.submit} onClick={handleRenameClick}>Rename</Button>
            {alertText &&
            <Alert severity="error" style={{marginTop: 10}}>
                {alertText}
            </Alert>}
        </Dialog>
    )
}
export default RenameCategoryDialog