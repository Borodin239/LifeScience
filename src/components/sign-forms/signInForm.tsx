import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EmailTextField from "./text-fields/EmailTextField";
import PasswordTextField from "./text-fields/PasswordTextField";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signUp: {
        cursor: "pointer",
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: "underline",
        },
    }
}));

const SignInForm = () => {
    const history = useHistory()
    const classes = useStyles();

    const handleSignUpClick = () => {
        history.push("/sign-up")
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <EmailTextField/>
                    <PasswordTextField repeat={false}/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Typography onClick={handleSignUpClick} className={classes.signUp}>
                        {"Don't have an account? Sign Up"}
                    </Typography>
                </form>
            </div>
        </Container>
    );
}
export default SignInForm