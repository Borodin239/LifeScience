import TextField from "@material-ui/core/TextField";
import React from "react";

type BaseTextFieldProps = {
    name: string,
    label: string,
    handleChange?: (newValue: string) => void,
    defaultValue?: string
}

const BaseTextField: React.FC<BaseTextFieldProps> = (props) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            label={props.label}
            name={props.name}
            defaultValue={props.defaultValue}
            // autoComplete="email"
            onChange={(event) => props.handleChange ? props.handleChange(event.target.value) : {}}
        />
    )

};

export default React.memo(BaseTextField);
