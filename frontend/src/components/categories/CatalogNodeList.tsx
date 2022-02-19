import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import NodeBox from "./NodeBox";

const useStyles = makeStyles((theme) => ({
    container: {
        // padding: theme.spacing(1)
        // margin: theme.spacing(1, 1, 1, 1),
    },
    nodes: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr"
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
            {/*<Typography color={'textSecondary'}>*/}
            {/*    {type}*/}
            {/*</Typography>*/}
            <Box className={classes.nodes}>
                {
                    list.map((node, ind) => <NodeBox key={ind} node={node} icon={icon}/>)
                }
            </Box>
        </Box>
    )
}

export default CatalogNodeList
