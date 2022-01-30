import SearchIcon from "@material-ui/icons/Search";
import {Paper, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useSearchTextFieldStyles from "./useSearchTextFieldStyles";
import apiConstants from "../../../infrastructure/http/api/apiConstants";
import {useHistory, useLocation} from "react-router-dom";
import {Autocomplete} from "@material-ui/lab";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {preSearchThunk} from "../../../redux/search/slice";

type SearchTextFieldProps = {
    placeholder?: string,
    passedClassName?: string
}

const SearchTextField: React.FC<SearchTextFieldProps> = ({placeholder, passedClassName}) => {

    const classes = useSearchTextFieldStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<string[]>([])

    useEffect(() => {
        const queryInUrl: string[] = new URLSearchParams(location.search).get(apiConstants.search.query)?.split("|") ?? []
        setQuery(queryInUrl)
    }, [location])

    const suggestions: string[] = useAppSelector(state => state.searchReducer.suggestions);

    const handleQueryChange = (event: any, value: string) => {
        if (value.length >= apiConstants.search.MIN_LENGTH) {
            dispatch(preSearchThunk(value));
        }
    }

    const handleChange = (event: any, value: string[]) => {
        setQuery(value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (query.toString().length >= apiConstants.search.MIN_LENGTH) {
            history.push(`${apiConstants.routes.search.SEARCH}/?${apiConstants.search.query}=${query.join("|")}`)
        }
    }

    return (
        <Paper component="form"
               className={`${classes.searchPaper} ${passedClassName}`}
               onSubmit={handleSubmit}>
            <SearchIcon className={classes.iconButton}/>
            <Autocomplete
                renderInput={(params) => (
                    <TextField {...params} label={null} variant="standard"
                               inputProps={{...params.inputProps, maxLength: apiConstants.search.MAX_LENGTH}}
                               placeholder={placeholder ?? "Search..."}
                    />
                )}
                options={suggestions}
                multiple
                autoComplete={true}
                freeSolo={true}
                className={classes.input}
                onInputChange={handleQueryChange}
                value={query}
                onChange={handleChange}
            />
        </Paper>
    )
}

export default SearchTextField
