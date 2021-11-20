import {Box, Divider, List, ListItem, Typography} from "@material-ui/core";
import React, { ReactChild, ReactFragment, ReactPortal, Key } from "react";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";

// @ts-ignore
export const PublicationsPage = (classes, protocols, history) => {

    const handleDraftProtocolClick = (id: string) => () => {
        history.push(`${appRoutesNames.DRAFT_PROTOCOLS}/${id}`)
    }

    return (
        <Box className={classes.protocolsPanel}>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'} style={{marginBottom: '5px'}}>
                    My draft protocols
                </Typography>
                <Divider className={classes.divider}/>
            </Box>
           
            <Box style={{marginLeft: "5px"}}>
                <List>
                    {
                        protocols.map((protocol: { id: any; name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                            <ListItem key={index}>
                                <Typography onClick={handleDraftProtocolClick(protocol.id)}
                                            className={classes.protocolTitle}>
                                    {protocol.name}
                                </Typography>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Box>
    )
}