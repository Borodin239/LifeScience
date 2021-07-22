import appRoutesNames from "../../common/appRoutesNames";

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

export const getRedirectionRoute = (type: 'category' | 'approach' | 'protocol', id: number): string => {
    if (type === 'category') {
        return `${appRoutesNames.CATEGORIES}/${id || ''}`;
    }

    if (type === 'approach') {
        return `${appRoutesNames.APPROACHES}/${id}`;
    }

    return `${appRoutesNames.PROTOCOLS}/${id}`;
}


