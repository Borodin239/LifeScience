import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {NavigationUnit} from "../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import { pathMove } from "../../redux/navigation/slice";
import Location, {LocationUnit} from "./Location";


const GlobalUserLocation: React.FC = () => {
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
        <Location locationList={locationPath}/>
    )
}

export default GlobalUserLocation
