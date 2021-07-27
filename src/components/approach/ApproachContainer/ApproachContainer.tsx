import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SectionList from "../SectionList/SectionList";
import ContentContainer from "../ContentContainer/ContentContainer";
import React, {useState} from "react";
import {useMethodPageStyles} from "../../../pages/MethodPage/method-page-styles";
import {RightProtocolsArrow} from "../ProtocolsArrows/ProtocolsArrows";
import {ApproachPreview} from "../../../infrastructure/http/api/view/approach/ApproachPreview";


type ApproachContainerProps = {
    approach: ApproachPreview,
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
                <RightProtocolsArrow handleClick={handleGoToProtocolsClick}/>
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