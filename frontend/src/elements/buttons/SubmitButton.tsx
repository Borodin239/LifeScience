import Button from "@material-ui/core/Button";
import React from "react";

const SubmitButton: React.FC<{text: string, className?: string}> = (props) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={props.className}
        >
            {props.text}
        </Button>
    )
}

export default React.memo(SubmitButton);
