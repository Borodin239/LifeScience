import React from 'react';
import styles from './App.module.css';
import {Button} from "@material-ui/core";

function App() {
    return (
        <div className={styles.App}>
            <header /*className={styles.AppHeader}*/>
                <p>
                    Edit <Button className={styles.buttonTest} color="primary">src/App.tsx</Button> and save to reload.
                </p>
            </header>
        </div>
    );
}

export default App;
