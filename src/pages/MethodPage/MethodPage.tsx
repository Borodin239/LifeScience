import React, {useCallback, useEffect, useState} from "react";
import {Box, Fade} from "@material-ui/core";
import {useMethodPageStyles} from "./method-page-styles";
import {useHistory, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {getPublicApproachThunk} from "../../redux/publicApproach/thunkActions";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import ApproachContainer from "../../components/approach/ApproachContainer/ApproachContainer";
import ProtocolList from "../../components/approach/ProtocolList/ProtocolList";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import {pathMove, setPath} from "../../redux/navigation/slice";
import {getRedirectionRoute, NavigationUnit} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import {hideProtocolList, viewProtocolList} from "../../redux/publicApproach/slice";
import {getCategoryPathsThunk} from "../../redux/categories/thunkActions";
import {ApproachView} from "../../infrastructure/http/api/view/approach/ApproachView";

interface ParamType {
    approachId: string
}

const MethodPage: React.FC = () => {
    const {approachId} = useParams<ParamType>()
    const history = useHistory()
    const classes = useMethodPageStyles()
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const handleGoToProtocolsClick = () => {
        dispatch(viewProtocolList())
    }

    const handleBackToMethodClick = () => {
        dispatch(hideProtocolList())
    }

    const updateLocation = useCallback((path: NavigationUnit[], payload: ApproachView) => {
        const unitRoute = getRedirectionRoute({type: "approach", approachId: approachId});
        if (path[path.length - 1]?.route !== unitRoute) {
            const category = payload.categories[0]
            const pathUnit = {id: category.id, name: category.name}
            dispatch(getCategoryPathsThunk(pathUnit))
                .unwrap()
                .then(payload => splitThunkPayload(payload))
                .then(pathPayload => {
                    dispatch(setPath(pathPayload))
                    dispatch(pathMove({
                        name: payload.name,
                        type: "approach",
                        route: getRedirectionRoute({type: "approach", approachId: approachId})
                    }))
                })
        }
    }, [approachId, dispatch])

    const isProtocolListViewed = useAppSelector(state => state.approachReducer.isProtocolListViewed)
    const path = useAppSelector(state => state.navigationReducer.path);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPublicApproachThunk(approachId))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(payload => {
                updateLocation(path, payload)
                setIsLoading(false);
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
                // setIsLoading(false);

            })
    }, [approachId, history, dispatch, path, updateLocation]);

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
                    <Fade in={isProtocolListViewed}>
                        <Box>
                            <ProtocolList protocols={approach.protocols}
                                          approachName={approach.name}
                                          approachId={approachId}
                                          handleGoBackClick={handleBackToMethodClick}/>
                        </Box>
                    </Fade>
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
