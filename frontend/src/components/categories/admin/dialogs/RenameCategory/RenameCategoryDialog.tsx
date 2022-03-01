import React, {useState} from "react";
import {CategoryDialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import {useStyles} from "../useDialogStyles";
import {useAppDispatch} from "../../../../../redux/hooks";
import {useHistory} from "react-router-dom";
import {updateCategory} from "../../../../../redux/categories/thunkActions";
import splitThunkPayload from "../../../../../redux/utils/splitThunkPayload";
import Alert from "@material-ui/lab/Alert";
import {pathMove} from "../../../../../redux/navigation/slice";
import {getRedirectionRoute} from "../../../../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import handleErrors from "../../../handleErrors";
import ButtonWithSpinner from "../../../../../elements/buttons/ButtonWithSpinner";

const RenameCategoryDialog: React.FC<CategoryDialogProps> = ({
                                                                 categoryId,
                                                                 onClose,
                                                                 isOpen,
                                                                 categoryName,
                                                                 setCategoryName
                                                             }) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const [alertText, setAlertText] = useState<string | null>(null)
    const history = useHistory()
    const [newName, setNewName] = useState<string>(categoryName!)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleRenameClick = () => {
        if (setCategoryName && !isLoading) {
            setIsLoading(true)
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
                .then(() => setAlertText(null))
                .then(() => dispatch(pathMove({
                    name: newName,
                    route: getRedirectionRoute({type: 'category', categoryId: categoryId.toString()}),
                    type: 'category'
                })))
                .then(() => setCategoryName(newName))
                .then(() => setIsLoading(false))
                .catch(thunkError => {
                    handleErrors(thunkError, history, dispatch, setAlertText)
                    setIsLoading(false)
                })
        }
    }

    return (
        <Dialog fullWidth={true} maxWidth={'xs'} open={isOpen} onClose={() => {
            onClose();
            setAlertText(null)
        }} classes={{paper: classes.paper}}>
            <DialogTitle>Rename "{categoryName}" category</DialogTitle>
            <TextField variant="outlined" defaultValue={categoryName} onChange={(e) =>
                setNewName(e.target.value)
            }/>
            <ButtonWithSpinner text={'Rename'} isLoading={isLoading} classes={classes} handleClick={handleRenameClick}/>
            {alertText &&
                <Alert severity="error" style={{marginTop: 10}}>
                    {alertText}
                </Alert>}
        </Dialog>
    )
}
export default RenameCategoryDialog