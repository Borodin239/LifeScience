import React from "react";
import {Box, CircularProgress} from "@material-ui/core";

type LoaderProps = {
    className?: string,
}

const CenteredLoader: React.FC<LoaderProps> = ({className}) => {
    return (
        <Box className={className}
             style={{
                 display: "flex",
                 justifyContent: "space-around",
             }}>
            <CircularProgress color="primary"/>
        </Box>
    )
}

export default React.memo(CenteredLoader);
