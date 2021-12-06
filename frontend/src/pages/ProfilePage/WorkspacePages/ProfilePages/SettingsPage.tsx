import {Box} from "@material-ui/core";
import BaseTextField from "../../../../elements/text-fields/BaseTextField";
import React from "react";
import SubmitButton from "../../../../elements/buttons/SubmitButton";
import {useProfilePageStyles} from "../../useProfilePageStyles";
import {useAppSelector} from "../../../../redux/hooks";

export const SettingsPage = () => {

    const classes = useProfilePageStyles()
    const userInfo = useAppSelector(state => state.usersReducer.userInfo)

    return (
        <form onSubmit={() => 1 + 1} noValidate>
            <Box>
                <BaseTextField label="First name"
                               name="First name"
                               defaultValue={userInfo?.personalData.firstName}
                />

                <BaseTextField label="Last name"
                               name="Last name"
                               defaultValue={userInfo?.personalData.lastName}
                />

                {/*TODO::enum*/}
                <BaseTextField label="Academic degree"
                               name="Academic degree"
                               defaultValue={userInfo?.personalData.academicDegree}
                />

                {/*TODO*/}
                <BaseTextField label="Doctoral degree"
                               name="Doctoral degree"
                               defaultValue={userInfo?.personalData.doctoralDegree ? "Y" : "NONE"}
                />

                <BaseTextField label="Organisations"
                               name="Organisations"
                               defaultValue={userInfo ? userInfo.personalData.organisations.join(', ') : ''}
                />

                {/*TODO*/}
                <BaseTextField label="Country"
                               name="Country"
                               defaultValue="Russia"
                />

                <SubmitButton text={"Save change"} className={classes.submitButton}/>
            </Box>
        </form>
    )
}