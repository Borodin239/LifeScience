import React, {useEffect, useState} from "react";
import {Box, Divider} from "@material-ui/core";
import Location from "../../components/categories/location";
import {useMethodPageStyles} from "./method-page-styles";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useHistory, useParams} from "react-router-dom";
import {generalInfoText, locationList} from "./temporaryConstants";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {getApproachThunk} from "../../redux/approach/slice";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import SectionList from "../../components/approach/SectionList/SectionList";

export type SectionTitle = {
    id: number,
    name: string,
}

type ProtocolTitle = {
    id: number,
    name: string,
}

type MethodPageProps = {
    name?: string,
    sections?: SectionTitle[],
    protocols?: ProtocolTitle[],
}

interface ParamType {
    id: string
}

// this is a layout - real method page is not going to be so dumbly written
const MethodPage: React.FC<MethodPageProps> = (props) => {
    const {id} = useParams<ParamType>()
    const history = useHistory()
    const classes = useMethodPageStyles()
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [selectedSection, setSelectedSection] = useState(0);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getApproachThunk(id))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => {
                setIsLoading(false)
            })
            .catch(thunkError => {
                setIsLoading(false);

                handleThunkErrorBase(thunkError, history, dispatch);
            })
    }, [id]);

    const handleSectionTitleClick = (index: number) => () => {
        setSelectedSection(index);
    }

    const approach = useAppSelector(state => state.approachReducer.approach)

    if (isLoading) {
        return <CenteredLoader className={classes.mainLoader}/>
    }

    console.log(approach.sections)

    return (
        <Box>
            <Box className={classes.breadCrumbs}>
                <Location locationList={locationList}/>
            </Box>
            <Box className={classes.methodTitleContainer}>
                <Typography variant={"h5"}>
                    {approach.name}
                </Typography>
                <Box>
                    <Box className={classes.goToProtocols}>
                        <Typography className={classes.goProtocolsText}>
                            Go to protocols
                        </Typography>
                        <ArrowForwardIcon fontSize={"small"} className={classes.protocolsArrow}/>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.mainContainer}>
                <SectionList sections={approach.sections}
                             selectedSection={selectedSection}
                             handleSectionTitleClick={handleSectionTitleClick}/>
                <Box className={classes.contentContainer}>
                    <Box>
                        <Box>
                            <Typography className={classes.contentTitle}>
                                {approach.sections[selectedSection].name}
                            </Typography>
                            <Divider style={{width: '35%'}} className={classes.divider}/>
                        </Box>
                        <Typography className={classes.content}>
                            {generalInfoText}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MethodPage