import {Protocol} from "../../../redux/publicApproach/slice";
import {Box} from "@material-ui/core";


type ProtocolListProps = {
    protocols: Protocol[],
    approachName: string,
}

const ProtocolList: React.FC<ProtocolListProps> = ({protocols, approachName}) => {

    const handleProtocolClick = (protocol: Protocol) => {
        console.log("clicked protocol with id: " + protocol.id)
    }


    return (
        <Box>
           <Box>

           </Box>
           <Box>

           </Box>
        </Box>
    )
}

export default ProtocolList