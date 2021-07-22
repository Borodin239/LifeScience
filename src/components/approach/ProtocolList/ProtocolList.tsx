import {Protocol} from "../../../redux/publicApproach/slice";
import {Box, List, ListItem, Typography} from "@material-ui/core";


type ProtocolListProps = {
    protocols: Protocol[],
    approachName: string,
    handleGoBackClick: () => void,
}

const ProtocolList: React.FC<ProtocolListProps> = (props) => {

    const {protocols, approachName, handleGoBackClick} = props

    const handleProtocolClick = (protocol: Protocol) => () => {
        console.log("clicked protocol with id: " + protocol.id)
    }

    return (
        <Box>
           <Box>
                <Box onClick={handleGoBackClick}>
                    <Typography>
                        Back to method
                    </Typography>
                </Box>
               <Typography>
                   {approachName}: protocols
               </Typography>
           </Box>
           <Box>
                <List>
                    {
                        protocols.map((protocol, index) => (
                            <ListItem key={index}>
                                <Typography onClick={handleProtocolClick(protocol)}>
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

export default ProtocolList