import React from "react";
import {SearchResultView} from "../../../../infrastructure/http/api/view/search/SearchResultView";
import {Typography} from "@material-ui/core";
import Paths from "./Paths/Paths";


type AdditionalInfoProps = {
    result: SearchResultView,
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({result}) => {

    switch (result.typeName) {
        case "Category": {
            return <Paths paths={result.paths}/>;
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