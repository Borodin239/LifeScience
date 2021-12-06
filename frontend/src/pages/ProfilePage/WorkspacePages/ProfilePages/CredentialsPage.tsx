import {Box, Typography} from "@material-ui/core";
import BaseTextField from "../../../../elements/text-fields/BaseTextField";
import React from "react";
import SubmitButton from "../../../../elements/buttons/SubmitButton";
import {useProfilePageStyles} from "../../useProfilePageStyles";
import {useAppSelector} from "../../../../redux/hooks";

export const CredentialsPage = () => {

    const classes = useProfilePageStyles()
    const userInfo = useAppSelector(state => state.usersReducer.userInfo)

    return (
        <form onSubmit={() => 1 + 1} noValidate>
            <Typography variant={'h6'}>
                Credentials
            </Typography>
            <Box>
                <BaseTextField label="Email"
                               name="Email"
                               defaultValue={userInfo?.email}
                />

                {/*TODO*/}
                <BaseTextField label="Password"
                               name="Password"
                               defaultValue="*****"
                />

                <SubmitButton text={"Save change"} className={classes.submitButton}/>
            </Box>
        </form>
    )
}