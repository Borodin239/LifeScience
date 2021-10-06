import {PathsView} from "../../../../../infrastructure/http/api/view/path/PathsView/PathsView";
import React, {useState} from "react";
import {Box} from "@material-ui/core";
import Path from "./Path/Path";
import ShowPathsText from "./ShowPathsText/ShowPathsText";


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
                (paths.length > 1) &&
                (showAllPaths ?
                        (
                            <>
                                {paths.map((path, index) => (
                                    (index !== 0) && <Path path={path}/>
                                ))}
                                <ShowPathsText text={"Hide"} handleClick={togglePaths}/>
                            </>
                        ) :
                        (
                            <ShowPathsText text={"Show all paths"} handleClick={togglePaths}/>
                        )
                )
            }
        </Box>
    )
}

export default Paths