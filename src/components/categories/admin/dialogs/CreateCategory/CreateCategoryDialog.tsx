import React, { MouseEvent } from "react";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";

export type DialogProps = {
    open: boolean,
    onClose: () => void,
}
//todo move this type somewhere

const CreateCategoryDialog: React.FC<DialogProps> = ({open, onClose}) => {

    const classes = useStyles()

    const handleCreateClick = (e: MouseEvent<HTMLButtonElement>) => {
        //preloader
        //dispatch
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} classes={{paper: classes.paper}}>
            <DialogTitle>Create new category</DialogTitle>
            <TextField variant='outlined' placeholder={"Enter category name"}/>
            <Button className={classes.submit} onClick={handleCreateClick}>Create</Button>
        </Dialog>
    )
}
export default CreateCategoryDialog