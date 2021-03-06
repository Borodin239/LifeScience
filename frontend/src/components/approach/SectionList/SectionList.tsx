import {useMethodPageStyles} from "../../../pages/MethodPage/useMethodPageStyles";
import Typography from "@material-ui/core/Typography";
import {Box, Divider, List, ListItem} from "@material-ui/core";
import React from "react";
import {SectionTitleView} from "../../../infrastructure/http/api/view/section/SectionTitleView";


type SectionListProps = {
    sections: SectionTitleView[],
    selectedSection: number,
    handleSectionTitleClick: (index: number) => () => void,
    className?: string,
}

const SectionList: React.FC<SectionListProps> = ({
                                                     sections,
                                                     selectedSection,
                                                     handleSectionTitleClick,
                                                 }) => {
    const classes = useMethodPageStyles()

    return (
        <Box className={classes.leftSideBar}>
            <Typography className={classes.sectionsTitle}>
                Sections
            </Typography>
            <Divider className={classes.divider}/>
            <Box className={classes.sectionList}>
                <List>
                    {
                        sections.map((section, index) => (
                                <ListItem key={index}>
                                    <Box className={(index === selectedSection)
                                        ? classes.selectedSectionSpace
                                        : classes.notSelectedSectionSpace}/>
                                    <Typography className={classes.sectionName}
                                                onClick={handleSectionTitleClick(index)}>
                                        {section.name}
                                    </Typography>
                                </ListItem>
                            )
                        )
                    }
                </List>
            </Box>
        </Box>
    )
}

export default SectionList