import appRoutesNames from "../../common/appRoutesNames";
import {PathUnitView} from "../../http/api/view/path/PathUnitView/PathUnitView";

export type NavigationUnit = {
    type: 'category' | 'approach' | 'protocol',
    name: string,
    route: string
}

export const addNavigationUnit = (unit: NavigationUnit, currentPath: NavigationUnit[]): NavigationUnit[] => {
    let newPath: NavigationUnit[] = [];

    for (let pathUnit of currentPath) {
        if (pathUnit.route === unit.route)
            break;

        newPath.push(pathUnit);
    }

    newPath.push(unit);

    return newPath;
}

export const patchPathFromNavigationUnit = (unit: NavigationUnit, currentPath: NavigationUnit[]): NavigationUnit[] => {
    if (currentPath[currentPath.length - 1]?.route !== unit.route)
        return [unit];

    return currentPath;
}

type CategoryRoute = {
    type: 'category',
    categoryId: string,
}

type ApproachRoute = {
    type: 'approach',
    approachId: string,
}

type ProtocolRoute = {
    type: 'protocol',
    approachId: string,
    protocolId: string,
}

export type RouteUrlArguments = CategoryRoute | ApproachRoute | ProtocolRoute

export const getRedirectionRoute = (args: RouteUrlArguments): string => {
    if (args.type === 'category') {
        return `${appRoutesNames.CATEGORIES}/${args.categoryId}`;
    }

    if (args.type === 'approach') {
        return `${appRoutesNames.APPROACHES}/${args.approachId}`;
    }

    return `${appRoutesNames.APPROACHES}/${args.approachId}${appRoutesNames.PROTOCOLS}/${args.protocolId}`;
}

export const pathToNavigationUnitList = (list: PathUnitView[]): NavigationUnit[] => {
    return list.map(pathUnit => {
        return {
            type: 'category',
            name: pathUnit.name,
            route: getRedirectionRoute({type: "category", categoryId: pathUnit.id})
        }
    })
}


