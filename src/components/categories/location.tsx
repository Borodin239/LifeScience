import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Typography} from "@material-ui/core";

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

export interface ILocationUnit {
    text: string,
    handleClick: (event: any) => void
}


export interface ILocationProps {
    locationList: ILocationUnit[]
}

const Location = ({locationList}: ILocationProps) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            {
                locationList.map((unit, index) => (
                    <>
                        <Typography onClick={unit.handleClick} variant="subtitle1" className={classes.locationUnit}>
                            {unit.text}
                        </Typography>
                        {index !== locationList.length - 1 &&
                            <ArrowRightIcon className={classes.arrow}/>
                        }
                    </>
                ))
            }
        </div>
    )
}

export default Location