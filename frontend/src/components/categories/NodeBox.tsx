import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CatalogNode} from "./CatalogNodeList";
import {Box, Typography} from "@material-ui/core";
import uiConstants from "../../infrastructure/ui/themes/uiConstants";
import animal from "../../../src/images/rootCategories/animal.png";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        borderRadius: '10px',
        margin: theme.spacing(1),
        padding: '0.7rem',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        cursor: "pointer",
        "&:hover": {
            backgroundColor: uiConstants.lightGrey
        },
        userSelect: "none",
        background: uiConstants.nodeBoxLight,
        justifyContent: 'space-between',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)'
    },
    icon: {
        color: uiConstants.darkBlue,
        paddingRight: theme.spacing(1),
    },
    node: {
        verticalAlign: "middle",
        color: uiConstants.darkBlue,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
    }
), {index: 1});

type NodeBoxProps = {
    node: CatalogNode,
    icon: JSX.Element
}

const NodeBox = ({node, icon}: NodeBoxProps) => {
    const classes = useStyles()
    return (
        <Box className={classes.container} onClick={node.handleClick}>
            <Box className={classes.icon}>
                <img src={animal} alt={"animal"}/>
                {/*{icon}*/}
            </Box>
            <Box>
                <Typography className={classes.node}>
                    {node.name}
                </Typography>
            </Box>
        </Box>
    )
}
export default NodeBox
