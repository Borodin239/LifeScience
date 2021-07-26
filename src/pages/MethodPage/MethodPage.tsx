import React, {useEffect, useState} from "react";
import {Box, Fade, Slide} from "@material-ui/core";
import {useMethodPageStyles} from "./method-page-styles";
import {useHistory, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {getPublicApproachThunk} from "../../redux/publicApproach/slice";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import ApproachContainer from "../../components/approach/ApproachContainer/ApproachContainer";
import ProtocolList from "../../components/approach/ProtocolList/ProtocolList";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";

interface ParamType {
    approachId: string
}

const MethodPage: React.FC = () => {
    const {approachId} = useParams<ParamType>()
    const history = useHistory()
    const classes = useMethodPageStyles()
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [isProtocolListViewed, setIsProtocolListViewed] = useState(false)

    const handleGoToProtocolsClick = () => {
        setIsProtocolListViewed(true)
    }

    const handleBackToMethodClick = () => {
        setIsProtocolListViewed(false)
    }

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPublicApproachThunk(approachId))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => {
                setIsLoading(false)
            })
            .catch(thunkError => {
                setIsLoading(false);

                handleThunkErrorBase(thunkError, history, dispatch);
            })
    }, [approachId]);

    const approach = useAppSelector(state => state.approachReducer.approach)

    if (isLoading) {
        return <CenteredLoader className={classes.mainLoader}/>
    }

    return (
        <Box>
            <Box className={classes.breadCrumbs}>
                <GlobalUserLocation/>
            </Box>
            {
                isProtocolListViewed
                    ?
                    <Slide in={isProtocolListViewed} direction={"left"} mountOnEnter unmountOnExit>
                        <Box>
                            <ProtocolList protocols={approach.protocols} approachName={approach.name}
                                          handleGoBackClick={handleBackToMethodClick}/>
                        </Box>
                    </Slide>
                    :
                    <Fade in={!isProtocolListViewed}>
                        <Box>
                            <ApproachContainer approach={approach}
                                               approachId={approachId}
                                               handleGoToProtocolsClick={handleGoToProtocolsClick}/>
                        </Box>
                     </Fade>

            }

        </Box>

    )
}

export default MethodPage