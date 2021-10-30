import React, { MouseEvent } from "react";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useStyles} from "../dialog-styles";

export type CategoryDialogProps = {
    isOpen: boolean,
    categoryId: number,
    onClose: () => void,
}
//todo move this type somewhere

const CreateCategoryDialog: React.FC<CategoryDialogProps> = (props) => {

    const classes = useStyles()

    const handleCreateClick = (e: MouseEvent<HTMLButtonElement>) => {
        //preloader
        //dispatch
        props.onClose()
    }

    return (
        <Dialog open={props.isOpen} onClose={props.onClose} classes={{paper: classes.paper}}>
            <DialogTitle>Create new category</DialogTitle>
            <TextField variant='outlined' placeholder={"Enter category name"}/>
            <Button className={classes.submit} onClick={handleCreateClick}>Create</Button>
        </Dialog>
    )
}
export default CreateCategoryDialog
