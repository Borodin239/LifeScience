import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useHistory} from "react-router-dom";
import {getDraftProtocolSectionThunk} from "../../../redux/section/thunkActions";
import splitThunkPayload from "../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../redux/utils/handleThunkErrorBase";
import ContentContainer from "./ContentContainer";


type DraftProtocolContentProps = {
    title: string,
    protocolId: string,
    sectionId: string,
}

const DraftProtocolContent: React.FC<DraftProtocolContentProps> = ({title, sectionId, protocolId}) => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getDraftProtocolSectionThunk({protocolId, sectionId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => {
                setIsLoading(false)
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }, [sectionId, protocolId, dispatch, history]);

    const section = useAppSelector(state => state.sectionReducer)


    return (
        <ContentContainer title={title} section = {section} isLoading = {isLoading}/>)
}

export default DraftProtocolContent