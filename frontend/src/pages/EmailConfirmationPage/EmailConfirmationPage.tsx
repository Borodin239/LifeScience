import React from "react";
import DescriptionBlock from "../../elements/temporary/DescriptionBlock/DescriptionBlock";
import {Button} from "@material-ui/core";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {useHistory} from "react-router-dom";
import {useEmailConfirmationPageStyle} from "./useEmailConfirmationPageStyle";


export const EmailConfirmationPage: React.FC = () => {
    const classes = useEmailConfirmationPageStyle()
    const history = useHistory();

    return (
        <div className={classes.container}>
            <DescriptionBlock type="warning" message="We sent you an email to verify your email address."/>
            <Button className={classes.toSignUpFormButton} onClick={() => {
                history.push(appRoutesNames.SIGN_IN);
            }}>Sign In</Button>
        </div>
    );
}