import {Box, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import CreateSection from "../../components/create-section/CreateSection";
import {useCreateProtocolPageStyles} from "./useCreateProtocolPageStyles";


type CreateProtocolParams = {
    approachId: string
}

const CreateProtocolPage = () => {
    const {approachId} = useParams<CreateProtocolParams>()

    const classes = useCreateProtocolPageStyles()

    return (
        <Box>
            <Box>
                <Typography className={classes.title}>
                    Create new protocol
                </Typography>
            </Box>
            <Box className={classes.editor}>
                <CreateSection handleSubmit={() => {}} />
            </Box>

        </Box>
    )
}

export default CreateProtocolPage
