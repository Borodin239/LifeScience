import React, {useEffect, useState} from "react";
import {Box, Divider, List, ListItem} from "@material-ui/core";
import Location from "../../components/categories/location";
import {useStyles} from "./method-page-styles";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useHistory, useParams} from "react-router-dom";
import {generalInfoText, locationList} from "./temporaryConstants";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import {getApproachThunk} from "../../redux/approach/slice";
import FormSubmitLoader from "../../elements/Loaders/CenteredLoader";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";

type SectionTitle = {
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
    const { id } = useParams<ParamType>()
    const history = useHistory()
    const classes = useStyles()
    const dispatch = useAppDispatch();

    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setIsPending(true)
        dispatch(getApproachThunk(id))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => {
                setIsPending(false)
            })
            .catch(thunkError => {
                setIsPending(false);

                handleThunkErrorBase(thunkError, history, dispatch);
            })
    }, [id])

    const approach = useAppSelector(state => state.approachReducer.approach)

    if (isPending) {
        return <CenteredLoader/>
    }

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
                    {/*<Divider className={classes.divider}/>*/}
                </Box>
            </Box>
            <Box className={classes.mainContainer}>
                <Box className={classes.leftSideBar}>
                    <Typography className={classes.sectionsTitle}>
                        Sections
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Box className={classes.sectionList}>
                        <List>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    Unselected value
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.selectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    Selected value
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    General information
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    Application
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Box className={classes.notSelectedSectionSpace}/>
                                <Typography className={classes.sectionName}>
                                    Find collaboration
                                </Typography>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
                <Box className={classes.contentContainer}>
                    <Box>
                        <Box>
                            <Typography className={classes.contentTitle}>
                                General information
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