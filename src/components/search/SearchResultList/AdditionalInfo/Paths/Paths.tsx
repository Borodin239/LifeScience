import {PathsView} from "../../../../../infrastructure/http/api/view/path/PathsView/PathsView";
import React, {useState} from "react";
import {Box} from "@material-ui/core";


type PathsProps = {
    paths: PathsView
}

const Paths: React.FC<PathsProps> = ({paths}) => {

    const [showAllPaths, setShowAllPaths] = useState(false)

    return (
        <Box>

        </Box>
    )
}

export default Paths