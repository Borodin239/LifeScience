import {Box, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useCreateProtocolPageStyles} from "./useCreateProtocolPageStyles";
import {useEffect, useState} from "react";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {getPublicProtocolThunk} from "../../redux/protocol/thunkActions";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import {useAppDispatch} from "../../redux/hooks";
import {getProtocolSectionThunk} from "../../redux/section/thunkActions";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import CreateSection from "../../components/create-section/CreateSection";


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

    const [text, setText] = useState("")

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
                return dispatch(getProtocolSectionThunk({approachId: approachId, protocolId: sourceProtocolId, sectionId: section.id}))
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
    }, [])

    //todo add deps in useEffect

    if (isLoading) return <CenteredLoader className={classes.loader}/>

    return (
        <Box>
            <Box>
                <Typography className={classes.title}>
                    Create new protocol
                </Typography>
            </Box>
            <Box className={classes.editor}>
                <CreateSection handleSubmit={() => {}} initialText={text}/>
            </Box>

        </Box>
    )
}

export default CreateProtocolPage
