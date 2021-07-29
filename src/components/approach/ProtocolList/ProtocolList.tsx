import {Box, List, ListItem, Typography} from "@material-ui/core";
import {useProtocolListStyles} from "./useProtocolListStyles";
import {LeftProtocolsArrow} from "../ProtocolsArrows/ProtocolsArrows";
import {ProtocolTitleView} from "../../../infrastructure/http/api/view/protocol/ProtocolTitleView";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";


type ProtocolListProps = {
    protocols: ProtocolTitleView[],
    approachName: string,
    approachId: string,
    handleGoBackClick: () => void,
}

const ProtocolList: React.FC<ProtocolListProps> = (props) => {

    const {protocols, approachName, approachId, handleGoBackClick} = props

    const history = useHistory()

    const handleProtocolClick = (protocol: ProtocolTitleView) => () => {
        history.push(`${appRoutesNames.APPROACHES}/${approachId}${appRoutesNames.PROTOCOLS}/${protocol.id}`)
    }

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