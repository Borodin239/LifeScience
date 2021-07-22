import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Breadcrumbs, Typography} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {NavigationUnit} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import { pathMove } from "../../redux/navigation/slice";


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
    handleClick: () => void
}

const Location: React.FC = () => {
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const history = useHistory();

    const [locationPath, setLocationPath] = useState<LocationUnit[]>([]);

    const path = useAppSelector<NavigationUnit[]>(state => state.navigationReducer.path);

    const createLocationUnit = useCallback((lu: NavigationUnit): LocationUnit => {
        return {
            text: lu.name,
            handleClick: () => {
                dispatch(pathMove(lu));
                history.push(lu.route);
            }
        } as LocationUnit;
    }, [dispatch, history]);

    useEffect(() => {
        setLocationPath(path.map(createLocationUnit));
    }, [path, createLocationUnit]);

    return (
        <Breadcrumbs separator={<NavigateNextIcon className={classes.arrow}/>} className={classes.container}>
            {
                locationPath.map((unit, ind) => (
                    <Typography key={ind} onClick={unit.handleClick} variant="subtitle1" className={classes.locationUnit}>
                        {unit.text}
                    </Typography>
                ))
            }
        </Breadcrumbs>
    )
}

export default Location
