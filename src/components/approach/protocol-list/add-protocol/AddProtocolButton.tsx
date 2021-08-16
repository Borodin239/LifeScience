import {Box, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import appRoutesNames from "../../../../infrastructure/common/appRoutesNames";
import {useAddProtocolStyles} from "./useAddProtocolStyles";
import AddIcon from '@material-ui/icons/Add';
import React from "react";


type AddProtocolButtonProps = {
    approachId: string,
}

const AddProtocolButton: React.FC<AddProtocolButtonProps> = ({approachId}) => {


    const history = useHistory()

    const classes = useAddProtocolStyles()

    const handleClick = () => {
        history.push(`${appRoutesNames.CREATE_PROTOCOL}/${approachId}`)
    }

    return (
        <Box className={classes.container}>
            <AddIcon fontSize={"small"} className={classes.icon}/>
            <Typography onClick={handleClick} className={classes.text}>
                Add new protocol
            </Typography>
        </Box>
    )
}

export default AddProtocolButton