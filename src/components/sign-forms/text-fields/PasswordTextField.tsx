import React from "react";
import TextField from "@material-ui/core/TextField";

const PasswordTextField = (props: any) => {
    const repeat = props.repeat ?? false
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={(repeat ? "Repeat " : "") + "Password"}
            type="password"
            id={(repeat ? "repeat-" : "") + "password"}
            autoComplete="current-password"
        />
    )
}
export default PasswordTextField
