import React, {useState} from "react";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import {useStyles} from "../useDialogStyles";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import {createCategory} from "../../../../../redux/categories/thunkActions";
import {useAppDispatch} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import {CategoryView} from "../../../../../infrastructure/http/api/view/category/CategoryView";
import handleErrors from "../../../handleErrors";
import ButtonWithSpinner from "../../../../../elements/buttons/ButtonWithSpinner";

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
    const [isLoading, setIsLoading] = React.useState(false)
    const history = useHistory()

    const handleCreateClick = (event: React.FormEvent) => {
        if (!isLoading) {
            event.preventDefault();
            setIsLoading(true);
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
                .then(() => setAlertText(null))
                .then(() => setIsLoading(false))
                .catch(thunkError => {
                    handleErrors(thunkError, history, dispatch, setAlertText)
                    setIsLoading(false)
                })
        }
    }

    return (
        // TODO :: fix onClose
        <Dialog fullWidth={true} maxWidth={'xs'} open={isOpen} onClose={() => {
            onClose();
            setAlertText(null)
        }} classes={{paper: classes.paper}} style={{width: '100%'}}>
            <DialogTitle>Create new category</DialogTitle>
            <TextField variant='outlined' placeholder={"Enter category name"}
                       onChange={(e) => setCategoryName(e.target.value)}/>
            <ButtonWithSpinner text={'Create'} isLoading={isLoading} classes={classes} handleClick={handleCreateClick}/>
            {alertText &&
                <Alert severity="error" style={{marginTop: 10}}>
                    {alertText}
                </Alert>}
        </Dialog>
    )
}
export default CreateCategoryDialog