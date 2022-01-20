import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import NodeBox from "./NodeBox";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";

const useStyles = makeStyles((theme) => ({
    container: {
      margin: theme.spacing(1, 0, 0, 0),
    },
    nodes: {
        display: "flex",
        flexWrap: "wrap"
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
            <Typography color={'textSecondary'}>
                {type}
            </Typography>
            <Box className={classes.nodes}>
                {
                    list.map((node, ind) => <NodeBox key={ind} node={node} icon={icon}/>)
                }
            </Box>
        </Box>
    )
}

export default CatalogNodeList
