import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import EmailTextField from "./text-fields/EmailTextField";
import PasswordTextField from "./text-fields/PasswordTextField";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import React from "react";


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
    redirect: {
        cursor: "pointer",
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: "underline",
        },
        margin: theme.spacing(1, 0, 0, 0),
    }
}));

const SubmitButton = (props: any) => {
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

const Title = (props: any) => {
    return (
        <Typography component="h1" variant="h5">
            {props.text}
        </Typography>
    )
}

export const SignUpForm = ({alertText}: any) => {
    const classes = useStyles();
    const history = useHistory()

    const handleSignInClick = () => {
        history.push("/sign-in")
    }

    return <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Title text={"Sign Up"}/>
            <form className={classes.form} noValidate>
                <EmailTextField/>
                <PasswordTextField repeat={false}/>
                <PasswordTextField repeat={true}/>
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

export const SignInForm = ({alertText}: any) => {
    const classes = useStyles();
    const history = useHistory()

    const handleSignUpClick = () => {
        history.push("/sign-up")
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Title text={"Sign In"}/>
                <form className={classes.form} noValidate>
                    <EmailTextField/>
                    <PasswordTextField repeat={false}/>
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
