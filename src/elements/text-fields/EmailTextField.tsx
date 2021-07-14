import React from "react";
import TextField from "@material-ui/core/TextField";

const EmailTextField: React.FC<{ handleChange: (newValue: string) => void }> = ({handleChange}) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            // id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => handleChange(event.target.value)}
        />
    )
}
export default React.memo(EmailTextField);
