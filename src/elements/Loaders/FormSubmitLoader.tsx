import React from "react";
import {Box, CircularProgress} from "@material-ui/core";
import useAuthFormStyles from "../../components/auth-forms/useAuthFormStyles";

const FormSubmitLoader: React.FC = () => {
    const classes = useAuthFormStyles()
    return (
        <Box className={classes.loader}>
            <CircularProgress color="primary" />
        </Box>
    )
}

export default React.memo(FormSubmitLoader);
