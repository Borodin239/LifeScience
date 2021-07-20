import React from "react";
import {alpha, makeStyles} from "@material-ui/core/styles";
import {CatalogNode} from "./CatalogNodeList";
import {Box, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        border: "1px solid " + alpha(theme.palette.common.black, 0.30),
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(1, 0, 0, 1),
        padding: theme.spacing(1),
        cursor: "pointer",
        "&:hover": {
            border: "1px solid " + theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.03)
        }
    },
    icon: {
        color: theme.palette.primary.main,
        paddingRight: theme.spacing(1),
    },
}));

type NodeBoxProps = {
    node: CatalogNode,
    icon: JSX.Element
}

const NodeBox = ({node, icon}: NodeBoxProps) => {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Box className={classes.icon}>
                {icon}
            </Box>
            <Box onClick={node.handleClick}>
                <Typography style={{verticalAlign: "middle"}}>
                    {node.name}
                </Typography>
            </Box>
        </Box>
    )
}
export default NodeBox
