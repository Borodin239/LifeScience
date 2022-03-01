import SearchIcon from "@material-ui/icons/Search";
import {Chip, Paper, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useSearchTextFieldStyles from "./useSearchTextFieldStyles";
import apiConstants from "../../../infrastructure/http/api/apiConstants";
import {useHistory, useLocation} from "react-router-dom";
import {Autocomplete} from "@material-ui/lab";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {preSearchThunk} from "../../../redux/search/slice";
import SubjectIcon from "@material-ui/icons/Subject";
import {SearchSuggestResultView} from "../../../infrastructure/http/api/view/search/SearchResultView";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import OptionBox from "../OptionBox/OptionBox";

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

    const suggestions: SearchSuggestResultView[] = useAppSelector(state => state.searchReducer.suggestions);

    const handleQueryChange = (event: React.ChangeEvent<{}>, value: string) => {
        if (value.length >= apiConstants.search.MIN_LENGTH) {
            dispatch(preSearchThunk(value));
        }
    }

    const handleChange = (event: React.ChangeEvent<{}>, value: any[]) => {
        let lastItem = value[value.length - 1]
        if (lastItem.hasOwnProperty('publicApproachId')) {
            history.push(`${appRoutesNames.APPROACHES}/${lastItem.publicApproachId}`);
        }
        setQuery(value.map(x => getOptionName(x)))
    }

    const handleSubmit = (e: React.ChangeEvent<{}>) => {
        e.preventDefault()
        if (query.toString().length >= apiConstants.search.MIN_LENGTH) {
            history.push(`${apiConstants.routes.search.SEARCH}/?${apiConstants.search.query}=${query.join("|")}`)
        }
    }

    const getOptionName = (op: SearchSuggestResultView | string) => {
        return typeof op === "string" ? op : op.name
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
                getOptionLabel={option => {
                    return getOptionName(option)
                }}
                multiple
                autoComplete={true}
                freeSolo={true}
                className={classes.input}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({index})}
                        />
                    ))
                }
                renderOption={(option) => <OptionBox label={option.name}
                                                     icon={option.typeName === 'Approach' ? <SubjectIcon/> :
                                                         <FolderOpenIcon/>}/>}
                getOptionDisabled={option => query.includes(getOptionName(option))}
                onInputChange={handleQueryChange}
                value={query}
                onChange={handleChange}
            />
        </Paper>
    )
}

export default SearchTextField
