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
import {TransitionProps} from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(props: TransitionProps, ref: React.Ref<unknown>) {
    return <Slide direction="down" timeout={{appear: 500, enter: 300, exit: 500}} ref={ref} {...props}/>;
});

const AboutUsDialog: React.FC<aboutUsTypes> = (props) => {
    const classes = useAboutUsWindowStyles();
    const {onClose, open} = props;
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open} maxWidth='lg'
            fullWidth={true}
            disableBackdropClick={true}
            TransitionComponent={Transition}>
            <DialogTitle>
                <Box display="flex">
                    <Box flexGrow={1}/>
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <AboutUsPanel/>
            <Box display="flex">
                <Box flexGrow={0.5}/>
                <Button className={classes.closeButton} onClick={onClose}>
                    Close
                </Button>
            </Box>
        </Dialog>
    );
}

type aboutUsTypes = {
    open: boolean,
    onClose: () => void
};

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
            <AboutUsDialog
                open={open}
                onClose={handleClickClose}
            />
        </div>
    );
}
export default AboutUsWindow