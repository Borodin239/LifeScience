import appRoutesNames from "../../../../../infrastructure/common/appRoutesNames";
import {Button} from "@material-ui/core";
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
        <div>
            <Button className={classes.signButton}
                    onClick={handleSignInClick}>
                Sign in
            </Button>
            <Button className={classes.signButton}
                    onClick={handleSignUpClick}>
                Sign up
            </Button>
        </div>
    );
};

export default UnauthorizedProfile;
