import React from "react";
import {Box} from "@material-ui/core";
import MDEditor from '@uiw/react-md-editor';

type CreateSectionProps = {
    handleSubmit: (text: string) => void,
    initialText?: string,
}

const CreateSection: React.FC<CreateSectionProps> = (props) => {
    const {handleSubmit, initialText} = props;

    const [value, setValue] = React.useState<string>("");

    const handleChange = (text: string | undefined) => {
        setValue(text ?? "")
    }

    return (
        <Box>
            <MDEditor value={value} onChange={handleChange}
            />
        </Box>
    );
}

export default CreateSection