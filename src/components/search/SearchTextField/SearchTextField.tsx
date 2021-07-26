import SearchIcon from "@material-ui/icons/Search";
import {InputBase, Paper} from "@material-ui/core";
import React from "react";
import useSearchTextFieldStyles from "./useSearchTextFieldStyles";

type SearchTextFieldProps = {
    placeholder?: string,
    defaultValue?: string,
}

const SearchTextField: React.FC<SearchTextFieldProps> = ({placeholder, defaultValue}) => {

    const classes = useSearchTextFieldStyles()

    return (
        <Paper component="form" className={classes.searchPaper}>
            <SearchIcon className={classes.iconButton}/>
            <InputBase
                className={classes.input}
                placeholder={placeholder ?? "Search..."}
                value={defaultValue ?? ""}
            />
        </Paper>
    )
}

export default SearchTextField