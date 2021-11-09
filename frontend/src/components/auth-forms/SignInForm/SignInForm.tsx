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
import {patchEmailConfirmationThunk, signInThunk} from "../../../redux/auth/thunkActions";
import FormSubmitLoader from "../../../elements/Loaders/CenteredLoader";
import handleThunkErrorBase from "../../../redux/utils/handleThunkErrorBase";


export const SignInForm: React.FC = () => {
    const classes = useAuthFormStyles();
    const history = useHistory();

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isPending, setIsPending] = useState(false);
    const [alertText, setAlertText] = useState<string | null>(null);
    const [isEmailConfirmationRequired, setIsEmailConfirmationRequired] = useState<boolean>(false);

    const handleSignUpClick = () => {
        history.replace(appRoutesNames.SIGN_UP);
    }

    const handleSendEmailClick = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(patchEmailConfirmationThunk(email))
            .unwrap()
            .then(() => history.push(appRoutesNames.EMAIL_CONFIRMATION))
            .catch(thunkError => {
                    handleThunkErrorBase(thunkError, history, dispatch);
            })
    }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setIsPending(true);
        setAlertText(null);

        dispatch(signInThunk({email, password}))
            .unwrap()
            // .then((payload) => splitThunkPayload(payload))
            .then(() => history.push(appRoutesNames.HOME))
            .catch(thunkError => {
                setIsPending(false);

                if (thunkError.name === 'ApiError' && (thunkError.description.httpCode === 400 || thunkError.description.systemCode === 401005
                    || thunkError.description.systemCode === 401006
                )) {
                    if (thunkError.description.systemCode === 401006) {
                        setIsEmailConfirmationRequired(true);
                    } else {
                        setIsEmailConfirmationRequired(false);
                    }
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
        // || err.description.systemCode === 401005
        // тк редирект тут без finally, потому что компонент уже unmounted
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
            {isEmailConfirmationRequired && <Typography onClick={handleSendEmailClick} className={classes.redirect}>
                {"Didn't get your email? Resend verification link"}
            </Typography>}
            {!isPending && <Typography onClick={handleSignUpClick} className={classes.redirect}>
                {"Don't have an account? Sign Up"}
            </Typography>}
        </div>
    </Container>
}
