import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ICatalogNode} from "./catalogNodeList";
import {Box, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        border: "1px solid " + theme.palette.common.black,
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(1, 0, 0, 1)
    },
    icon: {
        color: theme.palette.primary.main,
    },
}));

interface INodeBoxProps {
    node: ICatalogNode,
    icon: JSX.Element
}

const NodeBox = ({node, icon}: INodeBoxProps) => {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Box className={classes.icon}>
                {icon}
            </Box>
            <Box onClick={node.handleClick}>
                <Typography>
                    {node.name}
                </Typography>
            </Box>
        </Box>
    )
}
export default NodeBox