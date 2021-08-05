import {Box, Divider, Typography} from "@material-ui/core";
import {useCallback, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {searchThunk} from "../../redux/search/slice";
import splitThunkPayload from "../../redux/utils/splitThunkPayload";
import handleThunkErrorBase from "../../redux/utils/handleThunkErrorBase";
import SearchTextField from "../../components/search/SearchTextField/SearchTextField";
import apiConstants from "../../infrastructure/http/api/apiConstants";
import CenteredLoader from "../../elements/Loaders/CenteredLoader";
import {useSearchPageStyles} from "./useSearchPageStyles";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SubjectIcon from '@material-ui/icons/Subject';
import AssignmentIcon from '@material-ui/icons/Assignment';
import appRoutesNames from "../../infrastructure/common/appRoutesNames";
import {SearchDto, SearchType} from "../../infrastructure/http/api/dto/search/SearchDto";
import {SearchResultType} from "../../infrastructure/http/api/view/search/SearchResultType";
import {SearchResultView} from "../../infrastructure/http/api/view/search/SearchResultView";


const SearchPage = () => {

    const location = useLocation()
    const dispatch = useAppDispatch()
    const history = useHistory()

    const classes = useSearchPageStyles()

    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const updateSearch = useCallback(() => {
        const newQuery = new URLSearchParams(location.search).get(apiConstants.search.query) ?? ""
        setQuery(newQuery)
        const dto: SearchDto = {
            text: newQuery,
            includeTypes: [SearchType.APPROACH, SearchType.CATEGORY, SearchType.PROTOCOL]
        }
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
    }, [location, dispatch, history])

    useEffect(() => {
        updateSearch()
    }, [location.search, updateSearch])

    const renderIcon = (typeName: string) => {
        switch (typeName) {
            case SearchResultType.CATEGORY: {
                return <FolderOpenIcon fontSize="large"/>;
            }
            case SearchResultType.APPROACH: {
                return <SubjectIcon fontSize="large"/>;
            }
            case SearchResultType.PROTOCOL: {
                return <AssignmentIcon fontSize="large"/>
            }
        }
    }

    const handleClick = (result: SearchResultView) => () => {
        switch (result.typeName) {
            case "Approach": {
                history.push(`${appRoutesNames.APPROACHES}/${result.publishApproachId}`);
                return;
            }
            case "Category": {
                history.push(`${appRoutesNames.CATEGORIES}/${result.categoryId}`);
                return;
            }
            case "Protocol": {
                return;
            }
        }
    }

    const results = useAppSelector(state => state.searchReducer.results)

    if (isLoading) {
        return <CenteredLoader className={classes.loader}/>
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
            <Divider className={classes.divider}/>
            <Box>
                {
                    results.map(result =>
                        <>
                            <Box className={classes.searchResultContainer}>
                                <Box className={classes.iconContainer}>
                                    {renderIcon(result.typeName)}
                                </Box>
                                <Box>
                                    <Typography className={classes.searchResultName} onClick={handleClick(result)}>
                                        {result.name}
                                    </Typography>
                                    <Typography>
                                        Type: {result.typeName}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider className={classes.divider} style={{width: '30%'}}/>
                        </>
                    )

                }
            </Box>
        </Box>
    )
}

export default SearchPage
