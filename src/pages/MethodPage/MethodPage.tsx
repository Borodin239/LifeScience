import React from "react";
import {Box} from "@material-ui/core";
import Location from "../../components/categories/location";
import {locationList} from "../CategoryPage/categoryPage";
import {useStyles} from "./method-page-styles";

type SectionTitle = {
    id: number,
    name: string,
}

type ProtocolTitle = {
    id: number,
    name: string,
}

type MethodPageProps = {
    name: string,
    sections: SectionTitle[],
    protocols: ProtocolTitle[],
}

const MethodPage: React.FC<MethodPageProps> = (props) => {
    const classes = useStyles()

    return (
        <Box>
            <Box className={classes.breadCrumbs}>
                <Location locationList={locationList}/>
            </Box>
        </Box>
    )
}

export default MethodPage