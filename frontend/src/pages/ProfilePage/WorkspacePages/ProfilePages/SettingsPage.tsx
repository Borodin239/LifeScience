import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
import BaseTextField from "../../../../elements/text-fields/BaseTextField";
import React, {useState} from "react";
import {useProfilePageStyles} from "../../useProfilePageStyles";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import splitThunkPayload from "../../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../../redux/utils/handleThunkErrorBase";
import {updateUserData} from "../../../../redux/users/thunkActions";
import {useHistory} from "react-router-dom";
import {UserDTO} from "../../../../infrastructure/http/api/dto/user/UserDTO";
import TextField from "@material-ui/core/TextField";

export const SettingsPage = () => {

    const classes = useProfilePageStyles()
    const userInfo = useAppSelector(state => state.usersReducer.userInfo)
    const userId = useAppSelector(state => state.usersReducer.userInfo!.id)
    const [, setAlertText] = useState<string | null>(null);
    const history = useHistory()
    const [isChanged, setIsChanged] = useState(false)

    const dispatch = useAppDispatch()
    const [info, setInfo] = useState<UserDTO>({
        firstName: userInfo!.personalData.firstName, // ok
        lastName: userInfo!.personalData.lastName, // ok
        doctorDegree: userInfo!.personalData.doctoralDegree, // doesn't work
        academicDegree: userInfo!.personalData.academicDegree, // ok
        organisations: [], // ok
        about: userInfo!.personalData.about, // ok
        orcid: userInfo!.personalData.orcid, // unchangeable?
        researchId: userInfo!.personalData.researchId // unchangeable?
    })

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        dispatch(updateUserData({userDTO: info, userId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            // .then :: TODO :: setPending
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
                [name]: e
            }
        ))
    }

    const [academicDegreeValue, setAcademicDegreeValue] = React.useState(userInfo?.personalData.academicDegree);

    const handleAcademicDegreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAcademicDegreeValue((event.target as HTMLInputElement).value);
        // alert((event.target as HTMLInputElement).value)

        // TODO :: do it differently
        handleFieldChange((event.target as HTMLInputElement).value, "academicDegree")
    };

    const [hasDoctoralDegree, setHasDoctoralDegree] = React.useState(userInfo!.personalData.doctoralDegree)

    const handleDoctoralDegreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        alert(event.target.checked)
        setHasDoctoralDegree(event.target.checked);
        handleFieldChange(event.target.checked, "doctorDegree")
    };

    // TODO :: сделать ENUM для name

    // TODO :: add pending (кружочек с ожиданием)
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

                {/*TODO :: field size must be not fixed*/}
                <BaseTextField label="About"
                               name="About"
                               defaultValue={userInfo?.personalData.about}
                               handleChange={(e) => handleFieldChange(e, "about")}
                />

                {/*TODO :: избавиться от копипасты, посмотреть, можно ли по-другому сделать handleChange*/}
                <Box p={2}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Academic degree:</FormLabel>
                        <RadioGroup aria-label="academicDegree" name="academicDegree" value={academicDegreeValue}
                                    onChange={handleAcademicDegreeChange}>
                            <FormControlLabel value="ASSOCIATE" control={<Radio/>} label="Associate"/>
                            <FormControlLabel value="BACHELOR" control={<Radio/>} label="Bachelor"/>
                            <FormControlLabel value="MASTER" control={<Radio/>} label="Master"/>
                            <FormControlLabel value="PROFESSIONAL" control={<Radio/>} label="Professional"/>
                            <FormControlLabel value="NONE" control={<Radio/>} label="None"/>
                        </RadioGroup>
                    </FormControl>
                </Box>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={userInfo!.personalData.doctoralDegree}
                            onChange={handleDoctoralDegreeChange}
                            name="doctoralDegree"
                            color="primary"
                        />
                    }
                    label="Doctoral degree:"
                    labelPlacement={"start"}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Organisations"
                    name="Organisations"
                    defaultValue={"To be done..."}
                    disabled={true}
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