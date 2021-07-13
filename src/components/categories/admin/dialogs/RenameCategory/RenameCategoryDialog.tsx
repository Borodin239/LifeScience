import React from "react";
import {DialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const RenameCategoryDialog: React.FC<DialogProps> = ({open, onClose}) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Rename category</DialogTitle>
            <TextField/>
            <Button>Rename</Button>
        </Dialog>
    )
}
export default RenameCategoryDialog