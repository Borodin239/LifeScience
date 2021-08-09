import {PathsView} from "../../../../../infrastructure/http/api/view/path/PathsView/PathsView";
import React, {useState} from "react";
import {Box, Typography} from "@material-ui/core";
import Path from "./Path/Path";
import {usePathsStyles} from "./usePathsStyles";


type PathsProps = {
    paths: PathsView
}

const Paths: React.FC<PathsProps> = ({paths}) => {

    const classes = usePathsStyles()

    const [showAllPaths, setShowAllPaths] = useState(false)

    const firstPath = paths[0]

    const togglePaths = () => {
        setShowAllPaths(!showAllPaths)
    }

    return (
        <Box>
            <Path path={firstPath}/>
            {
                (paths.length > 1) &&
                (showAllPaths ?
                        (
                            <>
                                {paths.map((path, index) => (
                                    (index !== 0) && <Path path={path}/>
                                ))}
                                <Typography onClick={togglePaths}
                                            className={classes.showPathsText}
                                            color={"textSecondary"}>
                                    Hide
                                </Typography>
                            </>
                        ) :
                        (
                            <Typography onClick={togglePaths}
                                        className={classes.showPathsText}
                                        color={"textSecondary"}>
                                Show all paths
                            </Typography>
                        )
                )
            }
        </Box>
    )
}

export default Paths