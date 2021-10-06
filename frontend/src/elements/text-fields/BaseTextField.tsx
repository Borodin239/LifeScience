import TextField from "@material-ui/core/TextField";
import React from "react";

type BaseTextFieldProps = {
    name: string,
    label: string,
    handleChange: (newValue: string) => void
}

const BaseTextField: React.FC<BaseTextFieldProps> = (props) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={props.label}
            name={props.name}
            // autoComplete="email"
            onChange={(event) => props.handleChange(event.target.value)}
        />
    )

};

export default React.memo(BaseTextField);
