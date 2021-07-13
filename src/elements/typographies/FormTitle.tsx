import Typography from "@material-ui/core/Typography";
import React from "react";

const FormTitle: React.FC<{text: string, className?: string}> = (props) => {
    return (
        <Typography component="h1" variant="h5">
            {props.text}
        </Typography>
    )
};

export default React.memo(FormTitle);
