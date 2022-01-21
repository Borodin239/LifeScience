import React, {useCallback, useEffect, useState} from "react";
import {Box, Fade, useMediaQuery} from "@material-ui/core";
import {useMethodPageStyles} from "./useMethodPageStyles";
import {useHistory, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {getPublicApproachThunk} from "../../redux/publicApproach/thunkActions";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import ApproachContainer from "../../components/approach/ApproachContainer/ApproachContainer";
import ProtocolList from "../../components/approach/protocol-list/ProtocolList";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import {setPath} from "../../redux/navigation/slice";
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
    const [isLocationLoading, setIsLocationLoading] = useState(true)

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
                    const approachUnit = {
                        name: payload.name,
                        type: "approach",
                        route: getRedirectionRoute({type: "approach", approachId: approachId})
                    } as NavigationUnit
                    dispatch(setPath({pathUnits: pathPayload, extraRoutes: [approachUnit]}))
                    setIsLocationLoading(false)
                })
                .catch(thunkError => {
                    handleThunkErrorBase(thunkError, history, dispatch);
                });
        } else {
            setIsLocationLoading(false)
        }
    }, [approachId, dispatch, history])

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
            })
    }, [approachId, history, dispatch, updateLocation, path]);

    const approach = useAppSelector(state => state.approachReducer.approach)

    if (isLoading && isLocationLoading) {
        return <CenteredLoader className={classes.mainLoader}/>
    }

    return (
        <Box style={{background: 'white', flexGrow: 1, alignItems: 'center'}}>
            <Box className={classes.breadCrumbs}>
                <GlobalUserLocation/>
            </Box>
            <Box p={2}>
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

        </Box>

    )
}

export default MethodPage
