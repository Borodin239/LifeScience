import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


type ShowPathsTextProps = {
    text: string,
    handleClick: () => void,
}

const useStyles = makeStyles((theme) => ({

    showPathsText: {
        cursor: "pointer",
        "&:hover": {
            color: theme.palette.common.black
        }
    }
}), {index: 1});


const ShowPathsText: React.FC<ShowPathsTextProps> = ({text, handleClick}) => {

    const classes = useStyles()

    return (
        <Typography onClick={handleClick}
                    className={classes.showPathsText}
                    color={"textSecondary"}>
            {text}
        </Typography>
    )
}

export default ShowPathsText