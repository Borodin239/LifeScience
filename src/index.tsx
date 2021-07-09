import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from '@material-ui/core/styles';
import {paperbaseTheme} from "./infrastructure/ui/themes/paperbaseTheme";
import {StylesProvider} from '@material-ui/core/styles';
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import UnhandledErrorBoundary from "./components/boundary/UnhandledErrorBoundary";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={paperbaseTheme}>
            {/*injectFirst подключает пропсы компонентов MIU раньше, чем классы из модулей, поэтому теперь вторые более приоритетны*/}
            <StylesProvider injectFirst>
                <Provider store={store}>
                    <UnhandledErrorBoundary>
                        <App/>
                    </UnhandledErrorBoundary>
                </Provider>
            </StylesProvider>
        </ThemeProvider>
    </React.StrictMode>
,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
