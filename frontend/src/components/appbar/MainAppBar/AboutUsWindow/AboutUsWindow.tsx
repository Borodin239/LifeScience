import * as React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {propTypes} from "react-markdown";
import useAboutUsWindowStyles from "./useAboutUsWindowStyles";
import InfoPanel from "../../../landing-page/InfoPanel/InfoPanel";
import Box from "@material-ui/core/Box"

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SimpleDialog: React.FC<propTypes> = (props) => {
    const {onClose, open} = props;
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth='lg' fullWidth={true} disableBackdropClick={true}>
            <DialogTitle>
                <Box display="flex" alignItems="right">
                    <Box flexGrow={1}/>
                    <IconButton onClick={onClose} edge={"end"}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <InfoPanel/>
        </Dialog>
    );
}

type propTypes = {
    open: boolean,
    onClose: () => void
};

const AboutUsWindow: React.FC = () => {

    const classes = useAboutUsWindowStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button className={classes.signButton} onClick={handleClickOpen}>
                About us
            </Button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
export default AboutUsWindow