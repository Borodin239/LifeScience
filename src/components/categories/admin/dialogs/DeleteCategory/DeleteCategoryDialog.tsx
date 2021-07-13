import React from "react";
import {DialogProps} from "../CreateCategory/CreateCategoryDialog";
import {Box, Dialog} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const DeleteCategoryDialog: React.FC<DialogProps> = ({open, onClose}) => {

    return (
        <Dialog open={open} onClose={onClose}>
            Are you sure you want to delete this category?
            <Box>
                <Button>
                    Yes
                </Button>
                <Button onClick={onClose}>
                    No, go back
                </Button>
            </Box>
        </Dialog>
    )
}
export default DeleteCategoryDialog