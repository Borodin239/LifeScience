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

export const TokenValidationPage: React.FC = () => {
    const classes = useMessagePagesStyle()

    const {token} = useParams<{ token: string }>();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessfullyValidated, setIsSuccessfullyValidated] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        dispatch(patchTokenValidationThunk(token))
            .unwrap()
            .then(() => {
                setIsLoading(false);
            })
            .catch(thunkError => {
                setIsLoading(false);
                if (thunkError.name === 'ApiError' && (thunkError.description.systemCode === 401008
                    || thunkError.description.systemCode === 401007)) {
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