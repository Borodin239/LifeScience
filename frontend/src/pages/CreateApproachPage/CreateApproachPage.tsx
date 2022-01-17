import {Box, Button, TextField, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    patchPublicApproachSectionThunk,
    postPublicApproachSectionThunk
} from "../../redux/section/thunkActions";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import CreateSection from "../../components/create-section/CreateSection";
import {updateCurrentUserThunk} from "../../redux/users/thunkActions";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {PostDraftProtocolDto} from "../../infrastructure/http/api/dto/section/PostDraftProtocolDto";
import {useCreateProtocolPageStyles} from "../CreateProtocolPage/useCreateProtocolPageStyles";
import {postPublicApproachThunk} from "../../redux/publicApproach/thunkActions";


type CreateApproachParams = {
    initialCategoryId: string
}

const CreateApproachPage = () => {
    const {initialCategoryId} = useParams<CreateApproachParams>();

    const classes = useCreateProtocolPageStyles();

    const dispatch = useAppDispatch();
    const history = useHistory();

    const [text, setText] = useState("");
    const [approachName, setApproachName] = useState("");

    const isAuthorized = useAppSelector(state => state.authReducer.isAuthorized);

    const handleApproachNameChange = (e: any) => {
        setApproachName(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(postPublicApproachThunk({name: approachName, initialCategoryId: parseInt(initialCategoryId)}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                const approachId = payload.id;
                const dto = {name: "General Info", hidden: true} as PostDraftProtocolDto;
                return dispatch(postPublicApproachSectionThunk({dto: dto, approachId: approachId}))
                    .unwrap()
                    .then(payload => splitThunkPayload(payload))
                    .then(section => {
                        const dto = {...section, content: text};
                        return dispatch(
                            patchPublicApproachSectionThunk({
                                dto: dto,
                                approachId: approachId,
                                sectionId: section.id,
                            }))
                    })
                    .then(payload => payload.payload)
                    .then(payload => splitThunkPayload(payload))
                    .then(() => history.push(`${appRoutesNames.APPROACHES}/${approachId}`))
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }

    useEffect(() => {
        if (isAuthorized) {
            dispatch(updateCurrentUserThunk());
        }
    }, [isAuthorized, dispatch]);


    if (!isAuthorized) {
        history.replace(`${appRoutesNames.SIGN_IN}`)
    }

    return (
        <Box>
            <Box>
                <Typography className={classes.title}>
                    Create new approach
                </Typography>
            </Box>
            <Box className={classes.editor}>
                <TextField placeholder={"Enter approach name"}
                           onChange={handleApproachNameChange}
                           value={approachName}
                           className={classes.protocolName}/>
                <CreateSection text={text} setText={setText}/>
            </Box>
            <Box className={classes.submitButtonContainer}>
                <Button variant="outlined"
                        color="primary"
                        className={classes.submitButton}
                        onClick={handleSubmit}
                        disabled={!approachName}>
                    Create
                </Button>
            </Box>
        </Box>
    )
}

export default CreateApproachPage
