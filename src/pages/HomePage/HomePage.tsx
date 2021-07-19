import React from "react";
import {Button} from "@material-ui/core";
import styles from "./HomePage.module.css"

const HomePage: React.FC = () => {
    return (
        <header /*className={styles.AppHeader}*/>
            <p>w
                Edit <Button className={styles.buttonTest} color="primary">src/App.tsx</Button> and save to reload.
            </p>
        </header>
    )
}

export default HomePage
