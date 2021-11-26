import React, {useEffect, useState} from "react";
import {useMessagePagesStyle} from "./useMessagePagesStyle";
import {useHistory, useParams} from "react-router-dom";
import DescriptionBlock from "../../elements/temporary/DescriptionBlock/DescriptionBlock";
import {Box, Button} from "@material-ui/core";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {useAppDispatch} from "../../redux/hooks";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {patchTokenValidationThunk} from "../../redux/auth/thunkActions";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import apiConstants from "../../infrastructure/http/api/apiConstants";

export const TokenValidationPage: React.FC = () => {
    const classes = useMessagePagesStyle()

    const {token} = useParams<{ token: string }>();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const [isLoading, setLoadingState] = useState(true);
    const [isSuccessfullyValidated, setIsSuccessfullyValidated] = useState(true);

    useEffect(() => {
        setLoadingState(true)
        dispatch(patchTokenValidationThunk(token))
            .unwrap()
            .then(() => {
                setLoadingState(false);
            })
            .catch(thunkError => {
                setLoadingState(false);
                if (thunkError.name === 'ApiError' &&
                    (thunkError.description.systemCode === apiConstants.errors.EXPIRED_TOKEN
                        || thunkError.description.systemCode === apiConstants.errors.INVALID_TOKEN)) {
                    setIsSuccessfullyValidated(false);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }, [dispatch, history, token]);


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
                                        <div>
                                            <DescriptionBlock type="warning" message="Your email has been successfully
                                            confirmed. Log in to continue exploring our platform"/><Button
                                            className={classes.toSignUpFormButton} onClick={() => {
                                            history.push(appRoutesNames.SIGN_IN);
                                        }}>Sign In</Button></div>
                                    )
                                    :
                                    (
                                        <DescriptionBlock type="warning"
                                                          message="Unfortunately, your link is outdated."/>
                                        // TODO :: button "Send an email again"
                                    )
                            }
                        </Box>
                    )
            }
        </Box>
    );
}