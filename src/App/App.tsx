import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import styles from './App.module.css';
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HandledErrorBoundary from "../components/boundary/HandledErrorBoundary";
import HomePage from "../pages/HomePage/HomePage";
import Header from "../components/layouts/appBar";
import {SignInForm, SignUpForm} from "../components/sign-forms/signForms";
import CategoryPage from "../pages/CategoryPage/categoryPage";
// import {useAppDispatch} from "../redux/hooks";
// import {setError} from "../redux/error/actions";

function App() {
    // const dispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     dispatch(setError({message: "initial from App"}))
    // }, []);

    useEffect(() => {
        console.log(`App started in ${process.env.REACT_APP_MODE} mode`);
    }, [])
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <HandledErrorBoundary>
                    <Header logged={false}/>
                    <Switch>
                        {/*<Route exact path="/login"*/}
                        {/*       component={AuthPage}*/}
                        {/*/>*/}

                        <Route exact path="/">
                            <Redirect to='/home'/>
                        </Route>

                        <Route exact path="/home" render={() => <CategoryPage/>}/>
                        <Route exact path="/sign-in" render={() => <SignInForm alertText={"Some error"}/>}/>
                        <Route exact path="/sign-up" render={() => <SignUpForm/>}/>
                        <Route exact path="/errorPage"
                               render={() => <ErrorPage errorCode="400" message="ErrorPage"/>}/>

                        <Route render={() => <ErrorPage errorCode="404" message="Page doesn't exist"/>}/>
                    </Switch>
                </HandledErrorBoundary>
            </BrowserRouter>
        </div>
    );
}

export default App;
