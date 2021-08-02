import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useHistory} from "react-router-dom";
import {getProtocolSectionThunk} from "../../../redux/section/thunkActions";
import splitThunkPayload from "../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../redux/utils/handleThunkErrorBase";
import ContentContainer from "./ContentContainer";


type ProtocolContentProps = {
    title: string,
    approachId: string,
    protocolId: string,
    sectionId: string,
}

const ProtocolContent: React.FC<ProtocolContentProps> = ({title, approachId, sectionId, protocolId}) => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getProtocolSectionThunk({approachId, protocolId, sectionId}))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => {
                setIsLoading(false)
            })
            .catch(thunkError => {
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }, [sectionId, approachId, protocolId, dispatch, history]);

    const section = useAppSelector(state => state.sectionReducer)


    return (
        <ContentContainer title={title}
                          section={section}
                          isLoading={isLoading}/>
    )
}

export default ProtocolContent