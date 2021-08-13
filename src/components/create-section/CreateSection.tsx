import React from "react";
import {Box} from "@material-ui/core";

type CreateSectionProps = {
    title: string,
    handleSubmit: (text: string) => void,
    initialText?: string,
}

const CreateSection: React.FC<CreateSectionProps> = (props) => {
    const {title, handleSubmit, initialText} = props;

    return (
        <Box>

        </Box>
    );
}

export default CreateSection