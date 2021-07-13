import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import EmailTextField from "../../elements/text-fields/EmailTextField";
import PasswordTextField from "../../elements/text-fields/PasswordTextField";
import Alert from '@material-ui/lab/Alert';
import React from "react";
import useAuthFormStyles from "./useAuthFormStyles";
import SubmitButton from "../../elements/buttons/SubmitButton";
import FormTitle from "../../elements/typographies/FormTitle";

type SignProps = {
    alertText?: string
}

export const SignUpForm = ({alertText}: SignProps) => {
    const classes = useAuthFormStyles();
    const history = useHistory()

    const handleSignInClick = () => {
        history.push("/sign-in")
    }

    return <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <FormTitle text={"Sign Up"}/>
            <form className={classes.form} noValidate>
                <EmailTextField handleChange={() => {}}/>
                <PasswordTextField isRepeat={false} handleChange={() => {}}/>
                <PasswordTextField isRepeat={true} handleChange={() => {}}/>
                <SubmitButton text={"Sign Up"} className={classes.submit}/>
                {alertText &&
                <Alert severity="error">
                    {alertText}
                </Alert>}
            </form>
            <Typography onClick={handleSignInClick} className={classes.redirect}>
                {"Already have an account? Sign In"}
            </Typography>
        </div>
    </Container>
}

export const SignInForm = ({alertText}: SignProps) => {
    const classes = useAuthFormStyles();
    const history = useHistory()

    const handleSignUpClick = () => {
        history.push("/sign-up");
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <FormTitle text={"Sign In"}/>
                <form className={classes.form} noValidate>
                    <EmailTextField handleChange={() => {}}/>
                    <PasswordTextField isRepeat={false} handleChange={() => {}}/>
                    <SubmitButton text={"Sign In"} className={classes.submit}/>
                    {alertText &&
                    <Alert severity="error">
                        {alertText}
                    </Alert>}
                    <Typography onClick={handleSignUpClick} className={classes.redirect}>
                        {"Don't have an account? Sign Up"}
                    </Typography>
                </form>
            </div>
        </Container>
    );
}
