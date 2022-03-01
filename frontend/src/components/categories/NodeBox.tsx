import React from "react";
import {CatalogNode} from "./CatalogNodeList";
import {Box, Icon, Typography} from "@material-ui/core";
import human from "../../../src/images/rootCategories/human.svg";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import animal from "../../../src/images/rootCategories/animal.svg";
import bacteria from "../../../src/images/rootCategories/bacteria.svg";
import cell from "../../../src/images/rootCategories/cell.svg";
import cell_culture from "../../../src/images/rootCategories/cell_culture.svg";
import molecule from "../../../src/images/rootCategories/molecule.svg";
import organ from "../../../src/images/rootCategories/organ.svg";
import organelle from "../../../src/images/rootCategories/organelle.svg";
import plant from "../../../src/images/rootCategories/plant.svg";
import tissue from "../../../src/images/rootCategories/tissue.svg";
import virus from "../../../src/images/rootCategories/viruses.svg";
import insect from "../../../src/images/rootCategories/insect.svg";
import useNodeBoxStyles from "./useNodeBoxStyles";

const imagesMap = new Map([
    ["animal", animal],
    ["bacteria", bacteria],
    ["cell culture", cell_culture],
    ["human", human],
    ["molecule", molecule],
    ["organ", organ],
    ["plant", plant],
    ["tissue", tissue],
    ["virus", virus],
    ["cell", cell],
    ["organelle", organelle],
    ["insect", insect],
]);

type NodeBoxProps = {
    node: CatalogNode,
    isRootCategory: boolean
}

const NodeBox = ({node, isRootCategory}: NodeBoxProps) => {
    const classes = useNodeBoxStyles()
    return (
        <Box className={classes.container} onClick={node.handleClick}>

            {isRootCategory && imagesMap.get(node.name.toLowerCase())
                ?
                <Icon fontSize={'large'} classes={{root: classes.iconRoot}}>
                    <img className={classes.imageIcon} src={imagesMap.get(node.name.toLowerCase())} alt={node.name}/>
                </Icon>
                :
                <FolderOpenIcon/>
            }

            <Box className={classes.sign}>
                <Typography className={classes.node}>
                    {node.name}
                </Typography>
            </Box>
        </Box>
    )
}

export default NodeBox
