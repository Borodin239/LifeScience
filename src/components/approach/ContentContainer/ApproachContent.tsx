import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getSectionThunk} from "../../../redux/section/thunkActions";
import splitThunkPayload from "../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../redux/utils/handleThunkErrorBase";
import ContentContainer from "./ContentContainer";


type ContentProps = {
    title: string,
    approachId: string,
    sectionId: string,
}

const ApproachContent: React.FC<ContentProps> = ({title, approachId, sectionId}) => {

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
    }, [sectionId, approachId, dispatch, history]);

    const section = useAppSelector(state => state.sectionReducer)

    return (
        <ContentContainer title={title}
                          section={section}
                          isLoading={isLoading}/>
    )
}

export default ApproachContent