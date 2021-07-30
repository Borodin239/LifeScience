import {Box, Typography} from "@material-ui/core";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import React, {useEffect, useState} from "react";
import {useMethodPageStyles} from "../MethodPage/method-page-styles";
import {LeftProtocolsArrow} from "../../components/approach/ProtocolsArrows/ProtocolsArrows";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import {pathSwitch} from "../../redux/navigation/slice";
import {getRedirectionRoute, NavigationUnit} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {useHistory, useParams} from "react-router-dom";
import {getPublicProtocolThunk} from "../../redux/protocol/thunkActions";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {useProtocolPageStyles} from "./useProtocolPageStyles";
import SectionList from "../../components/approach/SectionList/SectionList";
import {viewProtocolList} from "../../redux/publicApproach/slice";
import ProtocolContent from "../../components/approach/ContentContainer/ProtocolContent";


interface ParamType {
    approachId: string,
    protocolId: string,
}

const ProtocolPage = () => {

    const dispatch = useAppDispatch()
    const history = useHistory()

    const methodClasses = useMethodPageStyles()
    const protocolClasses = useProtocolPageStyles()
    const {approachId, protocolId} = useParams<ParamType>()

    const [isLoading, setIsLoading] = useState(true);

    const [selectedSection, setSelectedSection] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPublicProtocolThunk({approachId, protocolId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                dispatch(pathSwitch({
                    name: payload.name,
                    type: "protocol",
                    route: getRedirectionRoute({type: "protocol", approachId: approachId, protocolId: protocolId})
                } as NavigationUnit));
                setIsLoading(false);
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
                // setIsLoading(false);

            })
    }, [approachId, history, dispatch]);

    const handleBackToProtocols = () => {
        dispatch(viewProtocolList())
        history.push(`${appRoutesNames.APPROACHES}/${approachId}`)
    }

    const handleSectionTitleClick = (index: number) => () => {
        setSelectedSection(index);
    }

    const protocol = useAppSelector(state => state.protocolReducer.protocol)

    if (isLoading) {
        return <CenteredLoader/>
    }

    return (
        <Box>
            <Box className={methodClasses.breadCrumbs}>
                <GlobalUserLocation/>
            </Box>
            <Box>
                <Box className={protocolClasses.upperBar}>
                    <Box className={protocolClasses.backButtonContainer}>
                        <LeftProtocolsArrow text={"To other protocols"} handleClick={handleBackToProtocols}/>
                    </Box>
                    <Typography variant={"h5"} className={protocolClasses.protocolName}>
                        {protocol.approach.name}: {protocol.name}
                    </Typography>
                </Box>
                <Box className={protocolClasses.protocolContainer}>
                    <SectionList sections={protocol.sections}
                                 selectedSection={selectedSection}
                                 handleSectionTitleClick={handleSectionTitleClick}/>
                    <ProtocolContent title={protocol.sections[selectedSection].name}
                                     approachId={protocol.approach.id}
                                     protocolId={protocol.id}
                                     sectionId={protocol.sections[selectedSection].id}/>
                </Box>
            </Box>

        </Box>
    )
}

export default ProtocolPage