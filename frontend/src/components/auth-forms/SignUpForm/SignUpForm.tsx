import useAuthFormStyles from "../useAuthFormStyles";
import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import FormTitle from "../../../elements/typographies/FormTitle";
import EmailTextField from "../../../elements/text-fields/EmailTextField";
import PasswordTextField from "../../../elements/text-fields/PasswordTextField";
import SubmitButton from "../../../elements/buttons/SubmitButton";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import BaseTextField from "../../../elements/text-fields/BaseTextField";
import validateSignUpForm from "./validateSignUpForm";
import {useAppDispatch} from "../../../redux/hooks";
import {signUpThunk} from "../../../redux/auth/thunkActions";
import FormSubmitLoader from "../../../elements/Loaders/CenteredLoader";
import handleThunkErrorBase from "../../../redux/utils/handleThunkErrorBase";
import splitThunkPayload from "../../../redux/utils/splitThunkPayload";

export const SignUpForm: React.FC = () => {
    const classes = useAuthFormStyles();
    const history = useHistory();

    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeat, setRepeat] = useState<string>('');

    const [isPending, setIsPending] = useState(false);
    const [alertText, setAlertText] = useState<string | null>(null);

    const handleSignInClick = () => {
        history.replace(appRoutesNames.SIGN_IN);
    }

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        try {
            validateSignUpForm(email, password, repeat);
        } catch (err /*ValidationError only*/) {
            // @ts-ignore
            setAlertText(err.message);
            return;
        }

        setIsPending(true);
        setAlertText(null);

        dispatch(signUpThunk({firstName, lastName, email, password}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => history.push(appRoutesNames.EMAIL_CONFIRMATION))
            .catch(thunkError => {
                setIsPending(false);

                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
        // тк редирект тут без finally, потому что компонент уже unmounted
        // .finally(() => setIsPending(false));
    }

    return <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <FormTitle text={"Sign Up"}/>
            <form className={classes.form} onSubmit={onFormSubmit} noValidate>
                <BaseTextField label="First Name" name="First Name" handleChange={setFirstName}/>
                <BaseTextField label="Last Name" name="Last Name" handleChange={setLastName}/>
                <EmailTextField handleChange={setEmail}/>
                <PasswordTextField isRepeat={false} handleChange={setPassword}/>
                <PasswordTextField isRepeat={true} handleChange={setRepeat}/>
                {isPending ? <FormSubmitLoader/> : <SubmitButton text={"Sign Up"} className={classes.submit}/>}
                {alertText &&
                <Alert severity="error">
                    {alertText}
                </Alert>}
            </form>
            {!isPending && <Typography onClick={handleSignInClick} className={classes.redirect}>
                {"Already have an account? Sign In"}
            </Typography>}
        </div>
    </Container>
}
