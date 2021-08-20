import React from "react";
import {Box} from "@material-ui/core";
import {useMethodPageStyles} from "../../pages/MethodPage/method-page-styles";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";
import MDEditor from '@uiw/react-md-editor';

type CreateSectionProps = {
    handleSubmit: (text: string) => void,
    initialText?: string,
}

const CreateSection: React.FC<CreateSectionProps> = (props) => {
    const {handleSubmit, initialText} = props;

    const [value, setValue] = React.useState<string>(initialText ?? "");

    const handleChange = (text: string | undefined) => {
        setValue(text ?? "")
    }

    const methodClasses = useMethodPageStyles()

    return (
        <Box className={methodClasses.content}>
            <MDEditor previewOptions={{remarkPlugins: uiConstants.markdownPlugins}} height={400}
                      value={value} onChange={handleChange}
            />
        </Box>
    );
}

export default CreateSection