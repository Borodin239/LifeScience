import {Box, Button, Divider, List, ListItem, Typography} from "@material-ui/core";
import React, { Key } from "react";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import {useProfilePageStyles} from "../useProfilePageStyles";
import {useHistory} from "react-router-dom";
import {ProtocolTitleView} from "../../../infrastructure/http/api/view/protocol/ProtocolTitleView";

export const PublicationsPage : React.FC<{protocols: ProtocolTitleView[]}> = ({protocols}) => {
    const classes = useProfilePageStyles()
    const history = useHistory()

    const handleDraftProtocolClick = (id: string) => () => {
        history.push(`${appRoutesNames.DRAFT_PROTOCOLS}/${id}`)
    }

    const handleClick = () => {
        history.push("/create-protocol/1");
    }

    return (
        <Box className={classes.protocolsPanel}>
            <Box className={classes.titleContainer}>
                <Typography variant={'h5'} style={{marginBottom: '5px'}}>
                    My protocols
                </Typography>
                <Divider className={classes.divider}/>
            </Box>
           
            <Box style={{marginLeft: "5px"}}>
                <List>
                    {
                        protocols.map((protocol: ProtocolTitleView, index: Key) => (
                            <ListItem key={index}>
                                <div>🞄   </div>
                                <Typography onClick={handleDraftProtocolClick(protocol.id)}
                                            className={classes.protocolTitle}>
                                    {protocol.name}
                                </Typography>
                            </ListItem>
                        ))
                    }
                </List>
                <Button variant="outlined"
                        // color="primary"
                        className={classes.button}
                        onClick={handleClick}
                        >
                    Create
                </Button>
            </Box>
        </Box>
    )
}