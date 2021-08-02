import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getApproachSectionThunk} from "../../../redux/section/thunkActions";
import splitThunkPayload from "../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../redux/utils/handleThunkErrorBase";
import ContentContainer from "./ContentContainer";


type ApproachContentProps = {
    title: string,
    approachId: string,
    sectionId: string,
}

const ApproachContent: React.FC<ApproachContentProps> = ({title, approachId, sectionId}) => {

    const dispatch = useAppDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getApproachSectionThunk({approachId, sectionId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => {
                setIsLoading(false)
            })
            .catch(thunkError => {
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