import {Box, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import CreateSection from "../../components/create-section/CreateSection";


type CreateProtocolParams = {
    methodId: string
}

const CreateProtocolPage = () => {
    const {methodId} = useParams<CreateProtocolParams>()


    return (
        <Box>
            <Box>
                <Typography>
                    Create new protocol
                </Typography>
            </Box>
            <Box>
                <CreateSection handleSubmit={() => {}} />
            </Box>
        </Box>
    )
}

export default CreateProtocolPage
