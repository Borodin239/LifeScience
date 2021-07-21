
export const getRootElementWidth = () => {
    const rootElem = document.getElementById('root');
    return rootElem ? rootElem.offsetWidth : 1100;
}

export const getMarginFromRoot = (width: number) => {
    return `calc(550px - ${width / 2}px)`;
}

export const getFullWidthStyling = () => {
    const rootElem = document.getElementById('root');
    const width = rootElem ? rootElem.offsetWidth : 1100;
    return {
        width: width,
        marginLeft: `calc(550px - ${width / 2}px)`,
    }
}