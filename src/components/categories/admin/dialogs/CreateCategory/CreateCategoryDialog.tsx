import React from 'react'
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export type DialogProps = {
    open: boolean,
    onClose: () => void,
}
//todo move this type somewhere

const CreateCategoryDialog: React.FC<DialogProps> = ({open, onClose}) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create new category</DialogTitle>
            <TextField placeholder={"Enter category name"}/>
            <Button>Create</Button>
        </Dialog>
    )
}
export default CreateCategoryDialog