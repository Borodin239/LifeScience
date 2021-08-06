import React from "react";
import {SearchResultView} from "../../../../infrastructure/http/api/view/search/SearchResultView";
import Path from "./Paths/Path/Path";
import {Typography} from "@material-ui/core";


type AdditionalInfoProps = {
    result: SearchResultView,
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({result}) => {

    switch (result.typeName) {
        case "Category": {
            return <Path path={result.paths[0]}/>;
        }
        case "Approach" :
        case "Protocol" : {
            return (
                <Typography>
                    Type: {result.typeName}
                </Typography>);
        }
    }
}

export default AdditionalInfo