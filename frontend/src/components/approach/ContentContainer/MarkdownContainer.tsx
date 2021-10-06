import uiConstants from "../../../infrastructure/ui/themes/uiConstants";
import ReactMarkdown from "react-markdown";
import React from "react";
import {useMethodPageStyles} from "../../../pages/MethodPage/method-page-styles";


type MarkdownContainerProps = {
    content: string,
}


const MarkdownContainer: React.FC<MarkdownContainerProps> = ({content}) => {

    const classes = useMethodPageStyles();

    return (
        <ReactMarkdown remarkPlugins={uiConstants.markdownPlugins} className={classes.content}>
            {content}
        </ReactMarkdown>
    )
}

export default MarkdownContainer