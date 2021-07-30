import {Box, List, ListItem, Typography} from "@material-ui/core";
import {useProtocolListStyles} from "./useProtocolListStyles";
import {LeftProtocolsArrow} from "../ProtocolsArrows/ProtocolsArrows";
import {ProtocolTitleView} from "../../../infrastructure/http/api/view/protocol/ProtocolTitleView";
import {useHistory} from "react-router-dom";
import {pathMove} from "../../../redux/navigation/slice";
import {getRedirectionRoute, NavigationUnit} from "../../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import {useAppDispatch} from "../../../redux/hooks";
import React, {useEffect} from "react";
import {hideProtocolList} from "../../../redux/publicApproach/slice";


type ProtocolListProps = {
    protocols: ProtocolTitleView[],
    approachName: string,
    approachId: string,
    handleGoBackClick: () => void,
}

const ProtocolList: React.FC<ProtocolListProps> = (props) => {

    const {protocols, approachName, approachId, handleGoBackClick} = props

    const history = useHistory()
    const dispatch = useAppDispatch()

    const handleProtocolClick = (protocol: ProtocolTitleView) => () => {
        const route = getRedirectionRoute({type: 'protocol', approachId: approachId, protocolId: protocol.id})

        dispatch(pathMove({name: protocol.name, route: route, type: 'protocol'} as NavigationUnit));
        history.push(route)
    }

    const onUnmount = () => {
        dispatch(hideProtocolList())
    }

    useEffect(() => {
        return onUnmount
    }, [])

    const classes = useProtocolListStyles()

    return (
        <Box>
           <Box className={classes.upperBar}>
               <Box className={classes.backToMethod}>
                    <LeftProtocolsArrow text={"Back to method"} handleClick={handleGoBackClick}/>
               </Box>
               <Typography variant={"h5"} className={classes.title}>
                   {approachName}: protocols
               </Typography>
           </Box>
           <Box className={classes.protocols}>
                <List>
                    {
                        protocols.map((protocol, index) => (
                            <ListItem key={index}>
                                <Typography onClick={handleProtocolClick(protocol)} className={classes.protocolName}>
                                    {index + 1}. {protocol.name}
                                </Typography>
                            </ListItem>
                        ))
                    }
                </List>
           </Box>
        </Box>
    )
}

export default ProtocolList