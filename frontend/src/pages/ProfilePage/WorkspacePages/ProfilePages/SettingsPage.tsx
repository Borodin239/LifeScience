import {
    Box,
    Button,
    Checkbox, CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup, Snackbar
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
import {Alert} from "@material-ui/lab";

export const SettingsPage = () => {

    const classes = useProfilePageStyles()
    const userInfo = useAppSelector(state => state.usersReducer.userInfo)
    const userId = useAppSelector(state => state.usersReducer.userInfo!.id)
    const [, setAlertText] = useState<string | null>(null);
    const history = useHistory()
    const [isChanged, setIsChanged] = useState(false)
    const [messageOpen, setMessageOpen] = React.useState(false);

    const dispatch = useAppDispatch()
    const [info, setInfo] = useState<UserDTO>({
        firstName: userInfo!.personalData.firstName, // ok
        lastName: userInfo!.personalData.lastName, // ok
        doctorDegree: userInfo!.personalData.doctorDegree, // doesn't work
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
            .then(() => setMessageOpen(true))
            .then(() => setIsChanged(false))
            .catch(thunkError => {
                if (thunkError.name === 'ApiError' && thunkError.description.httpCode === 400) {
                    setAlertText(thunkError.description.message);
                } else {
                    handleThunkErrorBase(thunkError, history, dispatch);
                }
            })
    }

    const handleFieldChange = (e: string | boolean, name: keyof UserDTO) => {
        if (e !== userInfo!.personalData[name]) {
            setIsChanged(true)
            setInfo(prevState => (
                {
                    ...prevState,
                    [name]: e
                }
            ))
        } else {
            setIsChanged(false)
        }
    }

    const [academicDegreeValue, setAcademicDegreeValue] = useState(userInfo?.personalData.academicDegree);

    const handleAcademicDegreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAcademicDegreeValue(event.target.value)
        handleFieldChange(event.target.value, "academicDegree")
    };

    const [hasDoctoralDegree, setHasDoctoralDegree] = useState(userInfo!.personalData.doctorDegree)

    const handleDoctoralDegreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasDoctoralDegree(event.target.checked);
        handleFieldChange(event.target.checked, "doctorDegree")
    };

    const [loading, setLoading] = useState(false);
    const [, setSuccess] = useState(false);
    const timer = React.useRef<number>();

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 500);
        }
    };

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
                            checked={hasDoctoralDegree}
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

                <Button
                    variant="outlined"
                    onSubmit={handleButtonClick} // ? works onClick, doesn't work onSubmit
                    type="submit"
                    color="primary"
                    className={classes.submitButton}
                    disabled={!isChanged || loading}
                >
                    {loading && <CircularProgress size={24}/>} Save changes
                </Button>
            </Box>

            <Snackbar open={messageOpen} autoHideDuration={6000} onClose={() => setMessageOpen(false)}>
                <Alert onClose={() => setMessageOpen(false)} severity="success">
                    Success!
                </Alert>
            </Snackbar>
        </form>
    )
}