import {Box, Typography} from "@material-ui/core";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import React, {useEffect, useState} from "react";
import {useMethodPageStyles} from "../MethodPage/method-page-styles";
import {LeftProtocolsArrow} from "../../components/approach/ProtocolsArrows/ProtocolsArrows";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import {pathSwitch} from "../../redux/navigation/slice";
import {getRedirectionRoute} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {useHistory, useParams} from "react-router-dom";
import {getPublicProtocolThunk} from "../../redux/protocol/thunkActions";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {useProtocolPageStyles} from "./useProtocolPageStyles";


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

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPublicProtocolThunk({approachId, protocolId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                dispatch(pathSwitch({
                    name: payload.name,
                    type: "protocol",
                    route: getRedirectionRoute("protocol", protocolId, approachId)
                }));
                setIsLoading(false);
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
                // setIsLoading(false);

            })
    }, [approachId, history, dispatch]);

    const handleBackToProtocols = () => {
        history.push(`${appRoutesNames.APPROACHES}/${approachId}`)
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
                <Box>
                {/*    section list  */}
                {/*    content container */}
                </Box>
            </Box>

        </Box>
    )
}

export default ProtocolPage