import {PathsView} from "../../../../infrastructure/http/api/view/search/PathsView/PathsView";
import React from "react";
import {Box, Breadcrumbs, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {getRedirectionRoute} from "../../../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import {usePathStyles} from "./usePathStyles";


type PathProps = {
    paths: PathsView
}
// now only available for categories
const Path: React.FC<PathProps> = ({paths}) => {

    const history = useHistory()
    const classes = usePathStyles()

    const path = paths[0] ?? [];

    const handleClick = (id: string) => () => {
        history.push(getRedirectionRoute({type: "category", categoryId: id}))
    }

    return (
        <Box>
            <Breadcrumbs>
                {
                    path.map(pathUnit => (
                        <Typography onClick={handleClick(pathUnit.id)} className={classes.unit}>
                            {pathUnit.name}
                        </Typography>
                    ))
                }
            </Breadcrumbs>
        </Box>

    )
}

export default Path