import appRoutesNames from "../../../../../infrastructure/common/appRoutesNames";
import {Box, Button} from "@material-ui/core";
import React from "react";
import {useHistory} from "react-router-dom";
import {useUnauthorizedProfileStyles} from "./useUnauthorizedProfileStyles";

const UnauthorizedProfile: React.FC = () => {
    const history = useHistory();
    const classes = useUnauthorizedProfileStyles()

    const handleSignInClick = () => {
        history.push(appRoutesNames.SIGN_IN)
    }

    const handleSignUpClick = () => {
        history.push(appRoutesNames.SIGN_UP)
    }

    return(
        <Box display={'flex'}>
            <Button className={classes.signButton}
                    onClick={handleSignInClick}>
                SIGN IN
            </Button>
            <Button className={classes.signButton}
                    onClick={handleSignUpClick}>
                SIGN UP
            </Button>
        </Box>
    );
};

export default UnauthorizedProfile;
