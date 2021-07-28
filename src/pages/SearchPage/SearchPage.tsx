import {Box, CircularProgress, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SearchDto, searchThunk} from "../../redux/search/slice";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import SearchTextField from "../../components/search/SearchTextField/SearchTextField";
import apiConstants from "../../infrastructure/http/api/apiConstants";


const SearchPage = () => {

    const location = useLocation()
    const dispatch = useAppDispatch()
    const history = useHistory()

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
        return <CircularProgress color={"primary"}/>
        //todo replace with CenteredLoader
    }

    return (
        <Box>
            <Box>
                <SearchTextField/>
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