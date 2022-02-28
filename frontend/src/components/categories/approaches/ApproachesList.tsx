import {Box} from "@material-ui/core";
import useApproachesListStyles from "./useApproachesListStyles";
import ApproachNode from "./ApproachNode/ApproachNode";
import React from "react";

export type CatalogNode = {
    name: string,
    handleClick: () => void,
}

export type CatalogNodeListProps = {
    list: CatalogNode[]
}

const ApproachesList = ({list}: CatalogNodeListProps) => {
    const classes = useApproachesListStyles()

    return (
        <Box className={classes.container}>
            <Box className={classes.approaches}>
                <Box className={classes.nodes}>
                    {
                        list.map((node, ind) => <ApproachNode key={ind} node={node}/>)
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default ApproachesList