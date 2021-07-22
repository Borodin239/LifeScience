import {Protocol} from "../../../redux/publicApproach/slice";
import {Box, List, ListItem, Typography} from "@material-ui/core";
import {useProtocolListStyles} from "./useProtocolListStyles";
import {LeftProtocolsArrow} from "../ProtocolsArrows/ProtocolsArrows";


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

    const classes = useProtocolListStyles()

    return (
        <Box>
           <Box className={classes.upperBar}>
               <Box className={classes.backToMethod}>
                    <LeftProtocolsArrow handleClick={handleGoBackClick}/>
               </Box>
               <Typography className={classes.title} variant={"h5"}>
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