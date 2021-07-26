import {Box, CircularProgress} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SearchDto, searchThunk} from "../../redux/search/slice";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import SearchTextField from "../../components/search/SearchTextField/SearchTextField";


const SearchPage = () => {

    const location = useLocation()
    const dispatch = useAppDispatch()

    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        updateSearch()
    }, [location.search])

    const updateSearch = () => {
        const newQuery = new URLSearchParams(location.search).get("query") ?? ""
        setQuery(newQuery)
        const dto: SearchDto = {query: newQuery}
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

            </Box>
            <Box>
                {/*search results*/}
            </Box>
        </Box>
    )
}

export default SearchPage