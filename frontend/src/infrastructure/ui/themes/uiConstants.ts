import gfm from "remark-gfm";
import footnotes from "remark-footnotes";

const uiConstants = {
    width: '90%',
    grey: "rgb(80, 80, 80)",
    markdownPlugins: [gfm, footnotes]
}

Object.freeze(uiConstants);

export default uiConstants;
