import React, {useState} from "react";
import {useStyles} from "../../categories/admin/dialogs/useDialogStyles";
import {Box, Dialog, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import {DialogProps} from "./DialogProps";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useHistory} from "react-router-dom";
import splitThunkPayload from "../../../redux/utils/splitThunkPayload";
import {pathMove} from "../../../redux/navigation/slice";
import {getRedirectionRoute} from "../../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import apiConstants from "../../../infrastructure/http/api/apiConstants";
import handleErrors from "../../categories/handleErrors";

const DeleteDialog: React.FC<DialogProps> = ({
                                                 id,
                                                 name,
                                                 type,
                                                 onClose,
                                                 isOpen,
                                                 deleteType
                                             }) => {

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const [alertText, setAlertText] = useState<string | null>(null)
    const parentId = useAppSelector(state => state.navigationReducer.path).map(i => i.route.split("/").pop()).reverse()[1]
    const parentName = useAppSelector(state => state.navigationReducer.path).map(i => i.name).reverse()[1]

    const handleDeleteButton = () => {
        dispatch(deleteType(id.toString()))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => dispatch(pathMove({
                    name: parentName,
                    route: getRedirectionRoute({type: 'category', categoryId: parentId!}),
                    type: 'category'
                }))
            )
            .then(payload => splitThunkPayload(payload))
            .then(() => history.replace(`${apiConstants.routes.categories.INITIAL}/${parentId}`))
            .then(() => onClose())
            .then(() => setAlertText(null))
            .catch(thunkError => {
                handleErrors(thunkError, history, dispatch, setAlertText)
            })
    }

    return (
        <Dialog open={isOpen} onClose={() => {
            onClose();
            setAlertText(null)
        }} classes={{paper: classes.paper}}>
            <DialogTitle>
                Are you sure you want to delete "{name}" {type}?
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
export default DeleteDialog