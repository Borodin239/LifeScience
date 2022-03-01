import gfm from "remark-gfm";
import footnotes from "remark-footnotes";

const uiConstants = {
    width: '90%',
    grey: "rgb(80, 80, 80)",
    orange: "#FA5C5B",
    lightGrey: 'rgba(255, 255, 255, 0.47)',
    darkBlue: '#120D43',
    mediumBlue: '#2B337D',
    markdownPlugins: [gfm, footnotes],
    // nodeBoxLight: '#E1E1E1'
    nodeBoxLight: 'white'
}

Object.freeze(uiConstants);

export default uiConstants;
