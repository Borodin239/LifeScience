import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import NodeBox from "./NodeBox";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1),
        margin: theme.spacing(1, 1, 1, 1),
        alignSelf: 'center',
        maxWidth: '80vw',
        minWidth: '80vw'
    },
    rootNodes: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr"
    },
    nodes: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    }
}), {index: 1});

export type CatalogNode = {
    name: string,
    handleClick: () => void,
}

export type CatalogNodeListProps = {
    isRootCategory: boolean,
    list: CatalogNode[]
}

const CatalogNodeList = ({list, isRootCategory}: CatalogNodeListProps) => {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Box className={isRootCategory ? classes.rootNodes : classes.nodes}>
                {
                    list.map((node, ind) => <NodeBox key={ind} node={node} isRootCategory={isRootCategory}/>)
                }
            </Box>
        </Box>
    )
}

export default CatalogNodeList
