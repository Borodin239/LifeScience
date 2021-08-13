import {Box} from "@material-ui/core";
import {useParams} from "react-router-dom";


type CreateProtocolParams = {
    methodId: string,
    sourceProtocolId: string,
}

const CreateProtocolPage = () => {
    const {methodId, sourceProtocolId} = useParams<CreateProtocolParams>()


    return (
        <Box>

        </Box>
    )
}

export default CreateProtocolPage