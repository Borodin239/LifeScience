import React from "react";
import {Box, Breadcrumbs, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {getRedirectionRoute} from "../../../../../../infrastructure/ui/utils/BreadcrumbsNavigationUtils";
import {usePathStyles} from "./usePathStyles";
import {PathUnitView} from "../../../../../../infrastructure/http/api/view/path/PathUnitView/PathUnitView";


type PathProps = {
    path: PathUnitView[]
}
// now only available for categories
const Path: React.FC<PathProps> = ({path}) => {

    const history = useHistory()
    const classes = usePathStyles()


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