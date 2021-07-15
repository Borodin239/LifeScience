import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import EmailTextField from "../../../elements/text-fields/EmailTextField";
import PasswordTextField from "../../../elements/text-fields/PasswordTextField";
import Alert from '@material-ui/lab/Alert';
import React, {useState} from "react";
import useAuthFormStyles from "../useAuthFormStyles";
import SubmitButton from "../../../elements/buttons/SubmitButton";
import FormTitle from "../../../elements/typographies/FormTitle";
import {useAppDispatch} from "../../../redux/hooks";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import {signInThunk} from "../../../redux/auth/thunkActions";
import {setError} from "../../../redux/error/slice";
import FormSubmitLoader from "../../../elements/Loaders/FormSubmitLoader";


export const SignInForm: React.FC = () => {
    const classes = useAuthFormStyles();
    const history = useHistory();

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isPending, setIsPending] = useState(false);
    const [alertText, setAlertText] = useState<string | null>(null);

    const handleSignUpClick = () => {
        history.replace(appRoutesNames.SIGN_UP);
    }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setIsPending(true);
        setAlertText(null);

        dispatch(signInThunk({email, password}))
            .unwrap()
            .then(() => history.push(appRoutesNames.HOME))
            .catch(apiErrorDescription => {
                setIsPending(false);

                if (apiErrorDescription.httpCode === 400 || apiErrorDescription.systemCode === 401005) {
                    setAlertText(apiErrorDescription.message);
                } else {
                    dispatch(setError({code: apiErrorDescription.httpCode, message: apiErrorDescription.message}));
                }
            })
        // тк редирект тут без finaally, потому что компонент уже unmounted
        // .finally(() => setIsPending(false));
    }

    return <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <FormTitle text={"Sign In"}/>
            <form className={classes.form} onSubmit={onFormSubmit} noValidate>
                <EmailTextField handleChange={setEmail}/>
                <PasswordTextField isRepeat={false} handleChange={setPassword}/>
                {isPending ? <FormSubmitLoader/> : <SubmitButton text={"Sign In"} className={classes.submit}/>}
                {alertText &&
                <Alert severity="error">
                    {alertText}
                </Alert>}
            </form>
            {!isPending && <Typography onClick={handleSignUpClick} className={classes.redirect}>
                {"Don't have an account? Sign Up"}
            </Typography>}
        </div>
    </Container>
}
