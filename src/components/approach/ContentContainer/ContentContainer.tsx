import {useMethodPageStyles} from "../../../pages/MethodPage/method-page-styles";
import {Box, Divider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getSectionThunk} from "../../../redux/section/slice";
import handleThunkErrorBase from "../../../redux/utils/handleThunkErrorBase";
import splitThunkPayload from "../../../redux/utils/splitThunkPayload";
import CenteredLoader from "../../../elements/Loaders/CenteredLoader";
import {useHistory} from "react-router-dom";


type ContentContainerProps = {
    title: string,
    approachId: string,
    sectionId: string,
}

const ContentContainer: React.FC<ContentContainerProps> = ({title, approachId, sectionId}) => {
    const classes = useMethodPageStyles();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getSectionThunk({approachId, sectionId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => {
                setIsLoading(false)
            })
            .catch(thunkError => {
                setIsLoading(false);

                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }, [sectionId]);

    const section = useAppSelector(state => state.sectionReducer)

    if (isLoading) {
        return <CenteredLoader/>
    }

    return (
        <Box className={classes.contentContainer}>
            <Box>
                <Box>
                    <Typography className={classes.contentTitle}>
                        {section.name}
                    </Typography>
                    <Divider style={{width: '35%'}} className={classes.divider}/>
                </Box>
                <Typography className={classes.content}>
                    {section.content}
                </Typography>
            </Box>
        </Box>
    )
}

export default ContentContainer