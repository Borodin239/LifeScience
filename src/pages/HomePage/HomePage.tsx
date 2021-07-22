import React from "react";
import {Box} from "@material-ui/core";
import WelcomePanel from "../../components/landing-page/WelcomePanel/WelcomePanel";
import InfoPanel from "../../components/landing-page/InfoPanel/InfoPanel";

const HomePage: React.FC = () => {
    return (
        <Box>
            <WelcomePanel/>
            <InfoPanel/>
        </Box>
    )
}

export default HomePage
