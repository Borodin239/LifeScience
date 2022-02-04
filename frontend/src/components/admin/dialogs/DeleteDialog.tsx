import React from "react";
import {useStyles} from "../../categories/admin/dialogs/dialog-styles";
import {Box, Dialog, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import {DialogProps} from "./DialogProps";

const DeleteDialog: React.FC<DialogProps> = ({
                                                 onClose,
                                                 isOpen,
                                                 name,
                                                 handleDeleteButton,
                                                 type,
                                                 alertText,
                                                 setAlertText
                                             }) => {

    const classes = useStyles()

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