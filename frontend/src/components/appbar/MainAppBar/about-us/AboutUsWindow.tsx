import * as React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import useAboutUsWindowStyles from "./useAboutUsWindowStyles";
import AboutUsPanel from "./AboutUsPanel";
import Box from "@material-ui/core/Box";

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const AboutUsWindow: React.FC = () => {
    const classes = useAboutUsWindowStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button className={classes.signButton} onClick={handleClickOpen}>
                About
            </Button>
            <Dialog
                open={open} maxWidth='lg'
                fullWidth={true}
                TransitionComponent={Slide}
            >
                <DialogTitle>
                    <Box display="flex">
                        <Box flexGrow={1}/>
                        <IconButton onClick={handleClickClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </DialogTitle>
                <AboutUsPanel/>
                <Box display="flex">
                    <Box flexGrow={0.5}/>
                    <Button className={classes.closeButton} onClick={handleClickClose}>
                        Close
                    </Button>
                </Box>
            </Dialog>
        </div>
    );
}
export default AboutUsWindow