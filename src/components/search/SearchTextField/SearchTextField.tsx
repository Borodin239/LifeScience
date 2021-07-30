import SearchIcon from "@material-ui/icons/Search";
import {InputBase, Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useSearchTextFieldStyles from "./useSearchTextFieldStyles";
import apiConstants from "../../../infrastructure/http/api/apiConstants";
import {useHistory, useLocation} from "react-router-dom";

type SearchTextFieldProps = {
    placeholder?: string,
    passedClassName?: string
}

const SearchTextField: React.FC<SearchTextFieldProps> = ({placeholder, passedClassName}) => {

    const classes = useSearchTextFieldStyles()
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const queryInUrl = new URLSearchParams(location.search).get(apiConstants.search.query) ?? ""
        setQuery(queryInUrl)
    }, [location])

    const [query, setQuery] = useState("")

    const handleQueryChange = (e: any) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (query.length >= apiConstants.search.MIN_LENGTH) {
            history.push(`${apiConstants.routes.search.SEARCH}/?${apiConstants.search.query}=${query}`);
        }
    }

    return (
        <Paper component="form"
               className={`${classes.searchPaper} ${passedClassName}`}
               onSubmit={handleSubmit}>
            <SearchIcon className={classes.iconButton}/>
            <InputBase
                className={classes.input}
                placeholder={placeholder ?? "Search..."}
                value={query}
                onChange={handleQueryChange}
                inputProps={{maxLength: apiConstants.search.MAX_LENGTH}}
            />
        </Paper>
    )
}

export default SearchTextField
