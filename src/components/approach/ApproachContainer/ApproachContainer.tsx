import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SectionList from "../SectionList/SectionList";
import ContentContainer from "../ContentContainer/ContentContainer";
import React, {useState} from "react";
import {useMethodPageStyles} from "../../../pages/MethodPage/method-page-styles";
import {ShortenedApproach} from "../../../redux/publicApproach/slice";


type ApproachContainerProps = {
    approach: ShortenedApproach,
    approachId: string,
    handleGoToProtocolsClick: () => void,
}

const ApproachContainer: React.FC<ApproachContainerProps> = (props) => {
    const {approach, approachId, handleGoToProtocolsClick} = props
    const classes = useMethodPageStyles()

    const [selectedSection, setSelectedSection] = useState(0);
    const handleSectionTitleClick = (index: number) => () => {
        setSelectedSection(index);
    }

    return (
        <Box>
            <Box className={classes.methodTitleContainer}>
                <Typography variant={"h5"}>
                    {approach.name}
                </Typography>
                <Box>
                    <Box className={classes.goToProtocols} onClick={handleGoToProtocolsClick}>
                        <Typography className={classes.goProtocolsText}>
                            Go to protocols
                        </Typography>
                        <ArrowForwardIcon fontSize={"small"} className={classes.protocolsArrow}/>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.mainContainer}>
                <SectionList sections={approach.sections}
                             selectedSection={selectedSection}
                             handleSectionTitleClick={handleSectionTitleClick}/>
                <ContentContainer title={approach.sections[selectedSection].name}
                                  approachId={approachId}
                                  sectionId={approach.sections[selectedSection].id}/>
            </Box>
        </Box>
    )
}

export default ApproachContainer