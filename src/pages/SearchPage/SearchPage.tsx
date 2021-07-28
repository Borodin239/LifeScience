import {Box, Divider, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SearchDto, SearchResultType, searchThunk} from "../../redux/search/slice";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import SearchTextField from "../../components/search/SearchTextField/SearchTextField";
import apiConstants from "../../infrastructure/http/api/apiConstants";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {useSearchPageStyles} from "./useSearchPageStyles";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SubjectIcon from '@material-ui/icons/Subject';
import AssignmentIcon from '@material-ui/icons/Assignment';


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

    const renderIcon = (typeName: string) => {
        switch (typeName) {
            case SearchResultType.Category: {
                return <FolderOpenIcon fontSize="large"/>;
            }
            case SearchResultType.Approach: {
                return <SubjectIcon fontSize="large"/>;
            }
            case SearchResultType.Protocol: {
                return <AssignmentIcon fontSize="large"/>
            }
        }
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
            <Box className={classes.titleContainer}>
                <Typography variant={"h5"}>
                    Found {results.length} results for "{query}":
                </Typography>
            </Box>
            <Divider/>
            <Box>
                {
                    results.map(result =>
                        <Box className={classes.searchResultContainer}>
                            <Box className={classes.iconContainer}>
                                {renderIcon(result.typeName)}
                            </Box>
                            <Box>
                                <Typography className={classes.searchResultName}>
                                    {result.name}
                                </Typography>
                                <Typography>
                                    Type: {result.typeName}
                                </Typography>
                            </Box>
                        </Box>
                    )

                }
            </Box>
        </Box>
    )
}

export default SearchPage