import {Box, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SectionList from "../SectionList/SectionList";
import React, {useState} from "react";
import {useMethodPageStyles} from "../../../pages/MethodPage/useMethodPageStyles";
import {RightProtocolsArrow} from "../ProtocolsArrows/ProtocolsArrows";
import {ApproachPreview} from "../../../infrastructure/http/api/view/approach/ApproachPreview";
import ApproachContent from "../ContentContainer/ApproachContent";
import {useAppSelector} from "../../../redux/hooks";
import DeleteDialog from "../../admin/dialogs/DeleteDialog";
import {deletePublicApproach} from "../../../redux/publicApproach/thunkActions";


type ApproachContainerProps = {
    approach: ApproachPreview,
    approachId: string,
    handleGoToProtocolsClick: () => void,
}

const ApproachContainer: React.FC<ApproachContainerProps> = (props) => {
    const {approach, approachId, handleGoToProtocolsClick} = props
    const classes = useMethodPageStyles()
    const userRoles = useAppSelector(state => state.usersReducer.userInfo?.roles);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [selectedSection, setSelectedSection] = useState(0);
    const handleSectionTitleClick = (index: number) => () => {
        setSelectedSection(index);
    }

    return (
        <Box>
            {(userRoles && userRoles.includes("ROLE_ADMIN")) ?
                <Box>
                    <Button variant="outlined" color="primary" onClick={() => setDeleteDialogOpen(true)}>
                        Delete approach
                    </Button>
                    <DeleteDialog id={parseInt(approachId)} name={approach.name} type={'approach'}
                                  onClose={() => setDeleteDialogOpen(false)} isOpen={deleteDialogOpen}
                                  deleteType={deletePublicApproach}/>
                </Box>
                : null}
            <Box className={classes.methodTitleContainer}>
                <Typography variant={"h5"}>
                    {approach.name}
                </Typography>
            </Box>
            <Box className={classes.mainContainer}>
                <SectionList sections={approach.sections}
                             selectedSection={selectedSection}
                             handleSectionTitleClick={handleSectionTitleClick}/>
                <ApproachContent title={approach.sections[selectedSection].name}
                                 approachId={approachId}
                                 sectionId={approach.sections[selectedSection].id}/>
                <Box className={classes.protocolsButtonContainer}>
                    <RightProtocolsArrow text={"Go to protocols"} handleClick={handleGoToProtocolsClick}/>
                </Box>
            </Box>
        </Box>
    )
}

export default ApproachContainer