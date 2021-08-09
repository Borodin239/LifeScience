import {Box, Typography} from "@material-ui/core";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import React, {useEffect, useState} from "react";
import {useMethodPageStyles} from "../MethodPage/method-page-styles";
import {LeftProtocolsArrow} from "../../components/approach/ProtocolsArrows/ProtocolsArrows";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import {pathMove, pathSwitch, setPath} from "../../redux/navigation/slice";
import {getRedirectionRoute, NavigationUnit} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {useHistory, useParams} from "react-router-dom";
import {getPublicProtocolThunk} from "../../redux/protocol/thunkActions";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {useProtocolPageStyles} from "./useProtocolPageStyles";
import SectionList from "../../components/approach/SectionList/SectionList";
import {viewProtocolList} from "../../redux/publicApproach/slice";
import ProtocolContent from "../../components/approach/ContentContainer/ProtocolContent";
import {getPublicApproachThunk} from "../../redux/publicApproach/thunkActions";
import {getCategoryPathsThunk} from "../../redux/categories/thunkActions";


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

    const path = useAppSelector(state => state.navigationReducer.path);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPublicProtocolThunk({approachId, protocolId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                const unitRoute = getRedirectionRoute({type: "protocol", approachId: approachId, protocolId: protocolId});
                if (path[path.length - 1]?.route !== unitRoute) {
                    dispatch(getPublicApproachThunk(approachId))
                        .unwrap()
                        .then(payload => splitThunkPayload(payload))
                        .then(approachPayload => {
                            const category = approachPayload.categories[0]
                            const pathUnit = {id: category.id, name: category.name}
                            dispatch(getCategoryPathsThunk(pathUnit))
                                .unwrap()
                                .then(payload => splitThunkPayload(payload))
                                .then(pathPayload => {
                                    dispatch(setPath(pathPayload))
                                    dispatch(pathMove({
                                        name: approachPayload.name,
                                        type: "approach",
                                        route: getRedirectionRoute({type: "approach", approachId: approachId})
                                    }))
                                    dispatch(pathMove({
                                        name: payload.name,
                                        type: "protocol",
                                        route: getRedirectionRoute({type: "protocol", approachId: approachId, protocolId: protocolId})
                                    }))
                                })
                        })
                }
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
    }, [protocolId, approachId, history, dispatch]);

    const handleBackToProtocols = () => {
        dispatch(viewProtocolList())

        const route = getRedirectionRoute({type: 'approach', approachId: approachId})
        dispatch(pathMove({name: protocol.approach.name, route: route, type: 'approach'} as NavigationUnit));
        history.push(route)
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
                        {protocol.name}
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