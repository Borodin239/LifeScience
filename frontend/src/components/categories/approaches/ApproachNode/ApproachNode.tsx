import {Box, Icon, Typography} from "@material-ui/core";
import React from "react";
import {CatalogNode} from "../../CatalogNodeList";
import useApproachNodeStyles from "./useApproachNodeStyles";
import icon from "../../../../images/approachNode/approachIcon.svg"
import addIcon from "../../../../images/approachNode/addToFaves.svg"

const ApproachNode = ({node}: { node: CatalogNode }) => {
    const classes = useApproachNodeStyles()

    const renderIcon = (icon: string, className: string) => {
        return <Icon fontSize={'medium'} className={className}>
            <img className={classes.imageIcon} src={icon} alt={node.name}/>
        </Icon>
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Box className={classes.iconAndApproachName}>
                    {renderIcon(icon, classes.imageIcon)}
                    <Box className={classes.headLine} onClick={node.handleClick}>{node.name}</Box>
                </Box>
                {renderIcon(addIcon, classes.addIcon)}
            </Box>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat.</Typography>
        </Box>
    )
}

export default ApproachNode