import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import React, {useState} from "react";
import {useMainSearchStyles} from "./useMainSearchStyles";
import {useHistory} from "react-router-dom";
import apiConstants from "../../../../infrastructure/http/api/apiConstants";

const MainSearch: React.FC = () => {
    const classes = useMainSearchStyles();
    const history = useHistory()
    const [query, setQuery] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (query.length >= apiConstants.search.MIN_LENGTH) {
            history.push(`${apiConstants.routes.search.SEARCH}/?${apiConstants.search.query}=${query}`);
            setQuery("");
        }
    }

    const handleChange = (e: any) => {
        setQuery(e.target.value)
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <form onSubmit={handleSubmit}>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{'aria-label': 'search', maxLength: apiConstants.search.MAX_LENGTH}}
                    onChange={handleChange}
                    value={query}
                />
            </form>
        </div>
    );
}

export default MainSearch;
