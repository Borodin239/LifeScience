import React from "react";
import TextField from "@material-ui/core/TextField";

const PasswordTextField: React.FC<{ isRepeat: boolean, handleChange: (newValue: string) => void }> = ({isRepeat, handleChange}) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={(isRepeat ? "Repeat " : "") + "Password"}
            type="password"
            // id={(isRepeat ? "repeat-" : "") + "password"}
            autoComplete="current-password"
            onChange={(event) => handleChange(event.target.value)}
        />
    )
}
export default React.memo(PasswordTextField);
