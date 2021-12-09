import {Box, List, ListItem, Typography} from "@material-ui/core";
import React, {Key, useEffect, useState} from "react";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import {useProfilePageStyles} from "../useProfilePageStyles";
import {useHistory} from "react-router-dom";
import {ProtocolTitleView} from "../../../infrastructure/http/api/view/protocol/ProtocolTitleView";
import {getUserDraftProtocols} from "../../../redux/users/thunkActions";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import splitThunkPayload from "../../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../../redux/utils/handleThunkErrorBase";

export const PublicationsPage = () => {

    const classes = useProfilePageStyles()
    const history = useHistory()
    const dispatch = useAppDispatch()

    const [protocols, setProtocols] = useState<ProtocolTitleView[]>([]);

    const handleDraftProtocolClick = (id: string) => () => {
        history.push(`${appRoutesNames.DRAFT_PROTOCOLS}/${id}`)
    }

    const userId = useAppSelector(state => state.usersReducer.userInfo?.id);

    useEffect(() => {
        if (userId) {
            dispatch(getUserDraftProtocols({userId: userId}))
                .unwrap()
                .then(payload => splitThunkPayload(payload))
                .then(payload => setProtocols(payload))
                .catch(thunkError => {
                    handleThunkErrorBase(thunkError, history, dispatch);
                });
        }
    }, [dispatch, history, userId]);

    return (
        <Box className={classes.protocolsPanel}>
            <Typography variant={'h6'}>
                My protocols
            </Typography>

            <List>
                {
                    protocols.map((protocol: ProtocolTitleView, index: Key) => (
                        <ListItem key={index}>
                            <div>🞄</div>
                            <Typography onClick={handleDraftProtocolClick(protocol.id)}
                                        className={classes.protocolTitle}>
                                {protocol.name}
                            </Typography>
                        </ListItem>
                    ))
                }
            </List>
            {/*TODO :: button "Create new"*/}
        </Box>
    )
}