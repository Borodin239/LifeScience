import {Box, Button, TextField, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useCreateProtocolPageStyles} from "./useCreateProtocolPageStyles";
import {useEffect, useState} from "react";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {getPublicProtocolThunk, postDraftProtocolThunk} from "../../redux/protocol/thunkActions";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    getProtocolSectionThunk,
    patchDraftProtocolSectionThunk,
    postDraftProtocolSectionThunk
} from "../../redux/section/thunkActions";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import CreateSection from "../../components/create-section/CreateSection";
import {updateCurrentUserThunk} from "../../redux/users/thunkActions";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {PostDraftProtocolDto} from "../../infrastructure/http/api/dto/section/PostDraftProtocolDto";


type CreateProtocolParams = {
    approachId: string,
    sourceProtocolId?: string,
}

const CreateProtocolPage = () => {
    const {approachId, sourceProtocolId} = useParams<CreateProtocolParams>();

    const classes = useCreateProtocolPageStyles();

    const dispatch = useAppDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(!!sourceProtocolId); // no loading when no source protocol

    const [text, setText] = useState("");
    const [protocolName, setProtocolName] = useState("");

    const isAuthorized = useAppSelector(state => state.authReducer.isAuthorized);

    const handleProtocolNameChange = (e: any) => {
        setProtocolName(e.target.value)
    }

    const handleSubmit = () => {
        setIsLoading(true)
        dispatch(postDraftProtocolThunk({name: protocolName, approachId: approachId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                const protocolId = payload.id;
                const dto = {name: "Protocol", hidden: false} as PostDraftProtocolDto;
                return dispatch(postDraftProtocolSectionThunk({dto: dto, protocolId: protocolId}))
                    .unwrap()
                    .then(payload => splitThunkPayload(payload))
                    .then(section => {
                        const dto = {...section, content: text};
                        return dispatch(patchDraftProtocolSectionThunk({
                            dto: dto,
                            protocolId: protocolId,
                            sectionId: section.id,
                        }))
                    })
                    .then(payload => payload.payload)
                    .then(payload => splitThunkPayload(payload))
                    .then(() => history.push(`${appRoutesNames.DRAFT_PROTOCOLS}/${protocolId}`))
            })
            .catch(thunkError => {
                setIsLoading(false);
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

    useEffect(() => {
        if (!sourceProtocolId) return
        setIsLoading(true);
        dispatch(getPublicProtocolThunk({approachId: approachId, protocolId: sourceProtocolId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                return payload.sections[0]
            })
            .then(section => {
                return dispatch(getProtocolSectionThunk({
                    approachId: approachId,
                    protocolId: sourceProtocolId,
                    sectionId: section.id
                }))
            })
            .then(payload => payload.payload)
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                setText(payload.content);
                setIsLoading(false);
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }, [approachId, dispatch, history, sourceProtocolId])

    if (isLoading) return <CenteredLoader className={classes.loader}/>

    return (
        <Box>
            <Box>
                <Typography className={classes.title}>
                    Create new protocol
                </Typography>
            </Box>
            <Box className={classes.editor}>
                <TextField placeholder={"Enter protocol name"}
                           onChange={handleProtocolNameChange}
                           value={protocolName}
                           className={classes.protocolName}/>
                <CreateSection text={text} setText={setText}/>
            </Box>
            <Box className={classes.submitButtonContainer}>
                <Button variant="outlined"
                        color="primary"
                        className={classes.submitButton}
                        onClick={handleSubmit}
                        disabled={!protocolName}>
                    Create
                </Button>
            </Box>
        </Box>
    )
}

export default CreateProtocolPage
