import SearchIcon from "@material-ui/icons/Search";
import {InputBase, Paper} from "@material-ui/core";
import React, {useState} from "react";
import useSearchTextFieldStyles from "./useSearchTextFieldStyles";
import apiConstants from "../../../infrastructure/http/api/apiConstants";
import {useHistory} from "react-router-dom";

type SearchTextFieldProps = {
    placeholder?: string,
    defaultValue?: string,
}

const SearchTextField: React.FC<SearchTextFieldProps> = ({placeholder, defaultValue}) => {

    const classes = useSearchTextFieldStyles()
    const history = useHistory()

    const [query, setQuery] = useState("")

    const handleQueryChange = (e: any) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("query: " + query);
        history.push(`${apiConstants.routes.search.SEARCH}/?${apiConstants.search.query}=${query}`);
    }

    return (
        <Paper component="form" className={classes.searchPaper} onSubmit={handleSubmit}>
            <SearchIcon className={classes.iconButton}/>
            <InputBase
                className={classes.input}
                placeholder={placeholder ?? "Search..."}
                defaultValue={defaultValue ?? ""}
                onChange={handleQueryChange}
            />
        </Paper>
    )
}

export default SearchTextField