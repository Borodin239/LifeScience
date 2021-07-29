import {Box, Typography} from "@material-ui/core";
import GlobalUserLocation from "../../components/navigation/GlobalUserLocation";
import React from "react";
import {useMethodPageStyles} from "../MethodPage/method-page-styles";
import {LeftProtocolsArrow} from "../../components/approach/ProtocolsArrows/ProtocolsArrows";


const ProtocolPage = () => {

    const methodClasses = useMethodPageStyles()


    return (
        <Box>
            <Box className={methodClasses.breadCrumbs}>
                <GlobalUserLocation/>
            </Box>
            <Box>
                <Box>
                    <LeftProtocolsArrow handleClick={() => {}}/>
                    <Typography>
                        Bradford assay: original protocol
                    </Typography>
                </Box>
                <Box>
                {/*    section list  */}
                {/*    content container */}
                </Box>
            </Box>

        </Box>
    )
}

export default ProtocolPage