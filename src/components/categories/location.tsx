import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Breadcrumbs, Typography} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "flex-start",
    },
    inline: {
        display: "inline-block",
    },
    locationUnit: {
        cursor: "pointer",
        '&:hover': {
            textDecoration: "underline",
        },
    },
    arrow: {
        color: theme.palette.primary.main,
    }
}));

export type LocationUnit = {
    text: string,
    handleClick: (event: any) => void
}


export type LocationProps = {
    locationList: LocationUnit[]
}

const Location = ({locationList}: LocationProps) => {
    const classes = useStyles()

    return (
        <Breadcrumbs separator={<NavigateNextIcon className={classes.arrow}/>} className={classes.container}>
            {
                locationList.map(unit => (
                    <Typography onClick={unit.handleClick} variant="subtitle1" className={classes.locationUnit}>
                        {unit.text}
                    </Typography>
                ))
            }
        </Breadcrumbs>
    )
}

export default Location