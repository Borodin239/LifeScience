import {PathsView} from "../../../../../infrastructure/http/api/view/path/PathsView/PathsView";
import React, {useState} from "react";
import {Box, Typography} from "@material-ui/core";
import Path from "./Path/Path";


type PathsProps = {
    paths: PathsView
}

const Paths: React.FC<PathsProps> = ({paths}) => {

    const [showAllPaths, setShowAllPaths] = useState(false)

    const firstPath = paths[0]

    const togglePaths = () => {
        setShowAllPaths(!showAllPaths)
    }

    return (
        <Box>
            <Path path={firstPath}/>
            {
                showAllPaths ?
                    (
                        <>
                            {paths.map((path, index) => (
                                (index !== 0) && <Path path={path}/>
                            ))}
                            <Typography onClick={togglePaths}>
                                Hide
                            </Typography>
                        </>
                    ) :
                    (
                        <Typography onClick={togglePaths}>
                            Show paths
                        </Typography>
                    )

            }
        </Box>
    )
}

export default Paths