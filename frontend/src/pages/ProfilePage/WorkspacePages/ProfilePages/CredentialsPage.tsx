import {Box, Button, Typography} from "@material-ui/core";
import BaseTextField from "../../../../elements/text-fields/BaseTextField";
import React, {useState} from "react";
import {useProfilePageStyles} from "../../useProfilePageStyles";
import {useAppSelector} from "../../../../redux/hooks";

export const CredentialsPage = () => {

    const classes = useProfilePageStyles()
    const userInfo = useAppSelector(state => state.usersReducer.userInfo)
    const [isChanged, setIsChanged] = useState(false)

    const handleSubmit = () => {
        // TODO
    }

    const handleFieldChange = (e: any) => {
        setIsChanged(true)
    }

    return (
        <form onSubmit={() => 1 + 1} noValidate>
            <Typography variant={'h6'}>
                Credentials
            </Typography>
            <Box>
                <div>
                    Attention! This page isn't ready yet.
                </div>
                <BaseTextField label="Email"
                               name="Email"
                               defaultValue={userInfo?.email}
                               handleChange={handleFieldChange}
                />

                {/*TODO :: default value*/}
                <BaseTextField label="Password"
                               name="Password"
                               defaultValue="*****"
                />

                <Button color="primary"
                        variant="outlined"
                        className={classes.submitButton}
                        onClick={handleSubmit}
                        disabled={!isChanged}>
                    Save changes
                </Button>
            </Box>
        </form>
    )
}