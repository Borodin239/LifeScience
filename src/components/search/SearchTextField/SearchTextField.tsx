import SearchIcon from "@material-ui/icons/Search";
import {InputBase, Paper} from "@material-ui/core";
import React from "react";
import useSearchTextFieldStyles from "./useSearchTextFieldStyles";


const SearchTextField = () => {

    const classes = useSearchTextFieldStyles()

    return (
        <Paper component="form" className={classes.searchPaper}>
            <SearchIcon className={classes.iconButton}/>
            <InputBase
                className={classes.input}
                placeholder="Search for the method"
            />
        </Paper>
    )
}

export default SearchTextField