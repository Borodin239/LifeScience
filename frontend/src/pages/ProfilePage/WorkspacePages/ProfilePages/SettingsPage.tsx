import {Box, Button} from "@material-ui/core";
import BaseTextField from "../../../../elements/text-fields/BaseTextField";
import React, {useState} from "react";
import {useProfilePageStyles} from "../../useProfilePageStyles";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {UserInfoView} from "../../../../infrastructure/http/api/view/social/user/UserInfoView";
import {signUpThunk} from "../../../../redux/auth/thunkActions";
import splitThunkPayload from "../../../../redux/utils/splitThunkPayload";
import appRoutesNames from "../../../../infrastructure/common/appRoutesNames";
import handleThunkErrorBase from "../../../../redux/utils/handleThunkErrorBase";
import {updateUserData} from "../../../../redux/users/thunkActions";
import {useHistory} from "react-router-dom";
import {UserDTO} from "../../../../infrastructure/http/api/view/social/user/UserDTO";

export const SettingsPage = () => {

    const classes = useProfilePageStyles()
    const userInfo = useAppSelector(state => state.usersReducer.userInfo)
    const userId = useAppSelector(state => state.usersReducer.userInfo!.id)
    const [alertText, setAlertText] = useState<string | null>(null);
    const history = useHistory()
    const [isChanged, setIsChanged] = useState(false)

    const dispatch = useAppDispatch()
    const [info, setInfo] = useState<UserDTO>({
        // "firstName": userInfo!.personalData.firstName,
        // "lastName": userInfo!.personalData.lastName,
        // "doctoralDegree": false,
        // "academicDegree": userInfo!.personalData.academicDegree,
        // "organisations": [{id: 0}],
        // "about": "jk",
        // "orcid": "1",
        // "researchId": "2"
        "firstName": "Evgenii",
        "lastName": "string",
        "doctorDegree": true,
        "academicDegree": "MASTER",
        "organisations": [],
        "about": "Update some info",
        "orcid": "ORCID",
        "researchId": "ID239"
    })

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        dispatch(updateUserData({userDTO: info, userId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            // .then :: TODO :: setMessage("updated")
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }

    const handleFieldChange = (e: any, name: string) => {
        // TODO :: кнопка должна активироваться только в случае,
        //  если введенные данные не совпадают с дефолтными
        setIsChanged(true)
        setInfo(prevState => (
            {
                ...prevState,
                // personalData : {
                //     ...prevState.personalData,
                [name]: e
            }
            // }
        ))
        // alert(info.personalData.firstName)
    }

    return (
        <form onSubmit={onFormSubmit} noValidate>
            <Box>
                <BaseTextField label="First name"
                               name="firstName"
                               defaultValue={userInfo?.personalData.firstName}
                               handleChange={(e) => handleFieldChange(e, "firstName")}
                />

                <BaseTextField label="Last name"
                               name="Last name"
                               defaultValue={userInfo?.personalData.lastName}
                               handleChange={(e) => handleFieldChange(e, "lastName")}
                />

                {/*TODO :: enum*/}
                <BaseTextField label="Academic degree"
                               name="Academic degree"
                               defaultValue={userInfo?.personalData.academicDegree}
                    // TODO :: handleChange={handleFieldChange}
                />

                {/*TODO*/}
                <BaseTextField label="Doctoral degree"
                               name="Doctoral degree"
                               defaultValue={userInfo?.personalData.doctoralDegree ? "Y" : "NONE"}
                    // TODO :: handleChange={handleFieldChange}
                />

                <BaseTextField label="Organisations"
                               name="Organisations"
                               defaultValue={userInfo ? userInfo.personalData.organisations.join(', ') : ''}
                    // TODO :: handleChange={handleFieldChange}
                />

                <Button color="primary"
                        type="submit"
                        variant="outlined"
                        className={classes.submitButton}
                        disabled={!isChanged}>
                    Save changes
                </Button>
            </Box>
        </form>
    )
}