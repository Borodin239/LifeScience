import React, {useEffect, useState} from "react";
import {useMessagePagesStyle} from "./useMessagePagesStyle";
import {useHistory, useParams} from "react-router-dom";
import DescriptionBlock from "../../elements/temporary/DescriptionBlock/DescriptionBlock";
import {Box, Button} from "@material-ui/core";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {useAppDispatch} from "../../redux/hooks";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {patchTokenValidationThunk} from "../../redux/auth/thunkActions";
import {authApi} from "../../infrastructure/http/api/methods/authApi";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";

export const TokenValidationPage: React.FC = () => {
    const classes = useMessagePagesStyle()

    const {token} = useParams<{ token: string }>();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessfullyValidated, setIsSuccessfullyValidated] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        authApi.validate_token(token).then(a => console.log(a))
        dispatch(patchTokenValidationThunk(token))
            .unwrap()
            .then(() => {
                setIsLoading(false)
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
            })
    }, [])


    return (
        <Box>
            {
                isLoading
                    ?
                    (
                        <CenteredLoader className={classes.upperLoader}/>
                    )
                    :
                    (
                        <Box className={classes.container}>
                            {
                                isSuccessfullyValidated
                                    ?
                                    (
                                        // TODO :: change messages to more appropriate
                                        <div>
                                            {/*TODO :: change messages to more appropriate*/}
                                            <DescriptionBlock type="warning" message="Success."/><Button
                                            className={classes.toSignUpFormButton} onClick={() => {
                                            history.push(appRoutesNames.SIGN_IN);
                                        }}>Sign In</Button></div>
                                    )
                                    :
                                    (
                                        <DescriptionBlock type="warning" message="Token died."/>
                                        // TODO :: button "Send an email again"
                                    )
                            }
                        </Box>
                    )
            }
        </Box>
    );
}