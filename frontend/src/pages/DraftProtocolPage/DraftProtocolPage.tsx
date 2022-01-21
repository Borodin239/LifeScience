import {useHistory, useParams} from "react-router-dom";
import {Box, Typography} from "@material-ui/core";
import {useProtocolPageStyles} from "../ProtocolPage/useProtocolPageStyles";
import SectionList from "../../components/approach/SectionList/SectionList";
import React, {useEffect, useState} from "react";
import {getDraftProtocolThunk} from "../../redux/protocol/thunkActions";
import {useAppDispatch} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {DraftProtocolView} from "../../infrastructure/http/api/view/protocol/DraftProtocolView";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import DraftProtocolContent from "../../components/approach/ContentContainer/DraftProtocolContent";


const DraftProtocolPage = () => {
    const {protocolId} = useParams<{ protocolId: string }>();

    const dispatch = useAppDispatch();
    const history = useHistory();

    const classes = useProtocolPageStyles()

    const [isLoading, setIsLoading] = useState(true);

    const [selectedSection, setSelectedSection] = useState(0)
    const [protocol, setProtocol] = useState<DraftProtocolView | null>(null);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getDraftProtocolThunk(protocolId))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                setProtocol(payload);
                setIsLoading(false);
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }, [dispatch, history, protocolId])

    const handleSectionTitleClick = (index: number) => () => {
        setSelectedSection(index);
    }

    if (isLoading || protocol === null) {
        return <CenteredLoader className={classes.loader}/>
    }

    return (
        <Box m={2}>
            <Box className={classes.upperBar}>
                <Typography variant={"h5"}>
                    {protocol.name}
                </Typography>
            </Box>
            <Box className={classes.protocolContainer}>
                {
                    (protocol.sections.length === 0) ?
                        <Typography>
                            This protocol is empty
                        </Typography>
                        :
                        <>
                            <SectionList sections={protocol.sections}
                                         selectedSection={selectedSection}
                                         handleSectionTitleClick={handleSectionTitleClick}/>
                            <DraftProtocolContent title={protocol.sections[selectedSection].name}
                                                  protocolId={protocol.id}
                                                  sectionId={protocol.sections[selectedSection].id}/>
                        </>
                }
            </Box>

        </Box>
    )
}

export default DraftProtocolPage
