import {Box, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SearchDto, searchThunk} from "../../redux/search/slice";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import SearchTextField from "../../components/search/SearchTextField/SearchTextField";
import apiConstants from "../../infrastructure/http/api/apiConstants";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {useSearchPageStyles} from "./useSearchPageStyles";


const SearchPage = () => {

    const location = useLocation()
    const dispatch = useAppDispatch()
    const history = useHistory()

    const classes = useSearchPageStyles()

    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        updateSearch()
    }, [location.search])

    const updateSearch = () => {
        const newQuery = new URLSearchParams(location.search).get(apiConstants.search.query) ?? ""
        setQuery(newQuery)
        const dto: SearchDto = {text: newQuery}
        dispatch(searchThunk(dto))
            .unwrap()
            .then(payload => splitThunkPayload(payload))
            .then(() => {
                setIsLoading(false);
            })
            .catch(thunkError => {
                setIsLoading(false);
                handleThunkErrorBase(thunkError, history, dispatch);
            });
    }
    const results = useAppSelector(state => state.searchReducer.results)

    if (isLoading) {
        return <CenteredLoader/>
    }

    return (
        <Box>
            <Box className={classes.searchFieldContainer}>
                <SearchTextField passedClassName={classes.searchField}/>
            </Box>
            <Box>
                <Typography>
                    Found {results.length} results for "{query}":
                </Typography>
            </Box>
            <Box>
                {
                    results.map(result =>
                        <Typography>
                            {result.name}
                        </Typography>
                    )

                }
            </Box>
        </Box>
    )
}

export default SearchPage