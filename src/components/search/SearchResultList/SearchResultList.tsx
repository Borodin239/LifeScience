import {Box, Divider, Typography} from "@material-ui/core";
import {SearchResultView} from "../../../infrastructure/http/api/view/search/SearchResultView";
import React from "react";
import {useSearchResultListStyles} from "./useSearchResultListStyles";
import {SearchResultType} from "../../../infrastructure/http/api/view/search/SearchResultType";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SubjectIcon from "@material-ui/icons/Subject";
import AssignmentIcon from "@material-ui/icons/Assignment";
import appRoutesNames from "../../../infrastructure/common/appRoutesNames";
import {useHistory} from "react-router-dom";


type SearchResultListProps = {
    results: SearchResultView[],

}

const SearchResultList: React.FC<SearchResultListProps> = ({results}) => {

    const history = useHistory()

    const classes = useSearchResultListStyles()

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

    return (
        <Box>
            {
                results.map(result =>
                    <>
                        <Box className={classes.searchResultContainer}>
                            <Box className={classes.iconContainer}>
                                {renderIcon(result.typeName)}
                            </Box>
                            <Box>
                                <Typography className={classes.name} onClick={handleClick(result)}>
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
    )
}

export default SearchResultList