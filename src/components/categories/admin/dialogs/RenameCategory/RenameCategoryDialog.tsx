import React from "react";
import {DialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";

const RenameCategoryDialog: React.FC<DialogProps> = ({open, onClose}) => {

    const classes = useStyles()

    const handleRenameClick = () => {
        // preloader than close
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} classes={{paper: classes.paper}}>
            <DialogTitle>Rename category</DialogTitle>
            <TextField variant="outlined" placeholder="Enter new name"/>
            <Button className={classes.submit} onClick={handleRenameClick}>Rename</Button>
        </Dialog>
    )
}
export default RenameCategoryDialog