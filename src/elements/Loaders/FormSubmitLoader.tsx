import React from "react";
import {CircularProgress} from "@material-ui/core";

const FormSubmitLoader: React.FC = () => {
    return (
        <CircularProgress color="secondary" />
    )
}

export default React.memo(FormSubmitLoader);
