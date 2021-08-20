import {useMethodPageStyles} from "../../../pages/MethodPage/method-page-styles";
import {Box, Divider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import CenteredLoader from "../../../elements/Loaders/CenteredLoader";
import {SectionView} from "../../../infrastructure/http/api/view/section/SectionView";
import ReactMarkdown from 'react-markdown'
import uiConstants from "../../../infrastructure/ui/themes/uiConstants";


type ContentContainerProps = {
    title: string,
    section: SectionView,
    isLoading: boolean,
}

const ContentContainer: React.FC<ContentContainerProps> = ({title, section, isLoading}) => {
    const classes = useMethodPageStyles();

    return (
        <Box className={classes.contentContainer}>
            <Box>
                <Box>
                    <Typography className={classes.contentTitle}>
                        {title}
                    </Typography>
                    <Divider style={{width: '35%'}} className={classes.divider}/>
                </Box>
                {
                    isLoading ? <CenteredLoader className={classes.contentLoader}/> :
                        <ReactMarkdown remarkPlugins={uiConstants.markdownPlugins} className={classes.content}>
                            {section.content}
                        </ReactMarkdown>
                }

            </Box>
        </Box>
    )
}

export default ContentContainer