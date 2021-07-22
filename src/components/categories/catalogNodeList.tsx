import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import NodeBox from "./nodeBox";

const useStyles = makeStyles((theme) => ({
    container: {
      margin: theme.spacing(1, 0, 0, 0),
    },
    nodes: {
        display: "flex",
    }
}), {index: 1});

export type CatalogNode = {
    name: string,
    handleClick: () => void,
}

export type CatalogNodeListProps = {
    type: string,
    icon: JSX.Element,
    list: CatalogNode[]
}

const CatalogNodeList = ({type, icon, list}: CatalogNodeListProps) => {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Typography>
                {type}
            </Typography>
            <Box className={classes.nodes}>
                {
                    list.map(node => <NodeBox node={node} icon={icon}/>)
                }
            </Box>
        </Box>
    )
}

export default CatalogNodeList