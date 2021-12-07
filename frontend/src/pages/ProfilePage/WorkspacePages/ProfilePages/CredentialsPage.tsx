import {Box, Button, Typography} from "@material-ui/core";
import BaseTextField from "../../../../elements/text-fields/BaseTextField";
import React, {useState} from "react";
import SubmitButton from "../../../../elements/buttons/SubmitButton";
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
        // setProtocolName(e.target.value)
        // TODO :: кнопка должна активироваться только в случае,
        //  если введенные данные не совпадают с дефолтными
        setIsChanged(true)
    }

    return (
        <form onSubmit={() => 1 + 1} noValidate>
            <Typography variant={'h6'}>
                Credentials
            </Typography>
            <Box>
                <BaseTextField label="Email"
                               name="Email"
                               defaultValue={userInfo?.email}
                               handleChange={handleFieldChange}
                />

                {/*TODO*/}
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