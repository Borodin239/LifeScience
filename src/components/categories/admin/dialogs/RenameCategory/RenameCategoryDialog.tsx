import React, { MouseEvent } from "react";
import {CategoryDialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";

const RenameCategoryDialog: React.FC<CategoryDialogProps> = ({isOpen, onClose}) => {

    const classes = useStyles()

    const handleRenameClick = (e: MouseEvent<HTMLButtonElement>) => {
        //preloader
        //dispatch
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
