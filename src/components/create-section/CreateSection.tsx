import React, {ReactElement} from "react";
import "react-mde/lib/styles/css/react-mde-toolbar.css";
import "react-mde/lib/styles/css/react-mde-editor.css";
import "react-mde/lib/styles/css/react-mde.css";
import {Box} from "@material-ui/core";
import ReactMde from "react-mde";
import MarkdownContainer from "../approach/ContentContainer/MarkdownContainer";

type CreateSectionProps = {
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
}

const CreateSection: React.FC<CreateSectionProps> = (props) => {
    const {text, setText} = props;

    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");

    const renderMarkdown = (text: string): ReactElement => {
        return <Box style={{padding: "10px"}}>
            <MarkdownContainer content={text}/>
        </Box>

    }

    return (
        <Box>
            <ReactMde
                value={text}
                onChange={setText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                minEditorHeight={400}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(renderMarkdown(markdown))
                }
            />
        </Box>
    );
}

export default CreateSection