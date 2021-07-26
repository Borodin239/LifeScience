import {Box, CircularProgress} from "@material-ui/core";
import {useState} from "react";


const SearchPage = () => {

    const [isLoading, setIsLoading] = useState(true)

    if (isLoading) {
        return <CircularProgress color={"primary"}/>
    }

    return (
        <Box>
            <Box>
                <SearchPage/>
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