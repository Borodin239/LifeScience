import React from "react";
import {Box, CircularProgress} from "@material-ui/core";
import useAuthFormStyles from "../../components/auth-forms/useAuthFormStyles";

const CenteredLoader: React.FC = () => {
    return (
        <Box style={{
            display: "flex",
            justifyContent: "space-around",
        }}>
            <CircularProgress color="primary"/>
        </Box>
    )
}

export default React.memo(CenteredLoader);
