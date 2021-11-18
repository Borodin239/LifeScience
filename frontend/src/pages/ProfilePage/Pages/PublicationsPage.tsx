import {Box, List, ListItem, Typography} from "@material-ui/core";
import { ReactChild, ReactFragment, ReactPortal, Key } from "react";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";

// @ts-ignore
export const PublicationsPage = (classes, protocols, history) => {

    const handleDraftProtocolClick = (id: string) => () => {
        history.push(`${appRoutesNames.DRAFT_PROTOCOLS}/${id}`)
    }

    return (
        <Box className={classes.protocolsPanel}>
            <Box>
                <Typography className={classes.protocolsTitle}>
                    My draft protocols:
                </Typography>
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