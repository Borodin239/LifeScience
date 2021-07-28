import React from "react";
import {CategoryDialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Box, Dialog, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";

const DeleteCategoryDialog: React.FC<CategoryDialogProps> = ({isOpen, onClose}) => {

    const classes = useStyles()

    const handleDeleteButton = () => {
        //preloader
        //dispatch
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
