import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import EmailTextField from "./text-fields/EmailTextField";
import PasswordTextField from "./text-fields/PasswordTextField";
import {useHistory} from "react-router-dom";

const SignUpForm = () => {

    const history = useHistory()

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
        signIn: {
            cursor: "pointer",
            color: theme.palette.primary.main,
            '&:hover': {
                textDecoration: "underline",
            },
        }
    }));

    const classes = useStyles();

    const handleSignInClick = () => {
        history.push("/sign-in")
    }

    return <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} noValidate>
                <EmailTextField/>
                <PasswordTextField repeat={false}/>
                <PasswordTextField repeat={true}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
            </form>
            <Typography onClick={handleSignInClick} className={classes.signIn}>
                {"Already have an account? Sign In"}
            </Typography>
        </div>
    </Container>
}

export default SignUpForm