import React, {useState} from "react";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../../../redux/utils/handleThunkErrorBase";
import {createCategory} from "../../../../../redux/categories/thunkActions";
import {useAppDispatch} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import {CategoryView} from "../../../../../infrastructure/http/api/view/category/CategoryView";
import {ROOT_NAVIGATION_UNIT} from "../../../../../redux/navigation/slice";

export type CategoryDialogProps = {
    categoryId: number,
    onClose: () => void,
    isOpen: boolean,
    updateCategoryCatalog?: (categoryCatalog: CategoryView) => void,
    categoryName?: string,
    setCategoryName?: (categoryName: string) => void,
}
//todo move this type somewhere

const CreateCategoryDialog: React.FC<CategoryDialogProps> = ({
                                                                 categoryId,
                                                                 onClose,
                                                                 isOpen,
                                                                 updateCategoryCatalog
                                                             }) => {

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
            initialParentId: categoryId.toString()
        }))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => updateCategoryCatalog!(payload))
            .then(() => onClose())
            .catch(thunkError => {
                if (thunkError.name === 'ApiError') {
                    if (thunkError.description.httpCode === 400) {
                        setAlertText(thunkError.description.message);
                    }
                    if (thunkError.description.httpCode === 404) {
                        history.push(ROOT_NAVIGATION_UNIT.route);
                    }
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }

    return (
        // TODO :: fix onClose
        // TODO :: fix alert-window size
        <Dialog open={isOpen} onClose={() => {
            onClose();
            setAlertText(null)
        }} classes={{paper: classes.paper}} style={{width: '100%'}}>
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