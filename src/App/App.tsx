import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HandledErrorBoundary from "../components/boundary/HandledErrorBoundary";
import MainAppBar from "../components/appbar/MainAppBar/MainAppBar";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import {SignInForm} from "../components/auth-forms/SignInForm/SignInForm";
import {SignUpForm} from "../components/auth-forms/SignUpForm/SignUpForm";
import appRoutesNames from "../infrastructure/common/appRoutesNames";
import HomePage from "../pages/HomePage/HomePage";
import MethodPage from "../pages/MethodPage/MethodPage";
import {useAppStyles} from "./useAppStyles";
import SearchPage from "../pages/SearchPage/SearchPage";
import {Box} from "@material-ui/core";
import './App.css'

function App() {
    // const dispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     dispatch(setError({message: "initial from App"}))
    // }, []);

    useEffect(() => {
        console.log(`App started in ${process.env.REACT_APP_MODE} mode`);
    }, [])

    const classes = useAppStyles()
    return (
        <div>
            <BrowserRouter>
                <HandledErrorBoundary>
                    <MainAppBar/>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={appRoutesNames.HOME}/>
                        </Route>
                        <Route exact path={appRoutesNames.HOME} render={() => <HomePage/>}/>
                        <Route>
                            <Box className={classes.fixedWidth}>
                                {/*1100 px*/}
                                <Switch>

                                    <Route exact path={`${appRoutesNames.APPROACHES}/:approachId(\\d{1,11})`} render={() => <MethodPage/>}/>
                                    <Route exact path={`${appRoutesNames.CATEGORIES}/:categoryId(\\d{0,11})`} render={() => <CategoryPage/>}/>
                                    <Route exact path={appRoutesNames.SIGN_IN} render={() => <SignInForm/>}/>
                                    <Route exact path={appRoutesNames.SIGN_UP} render={() => <SignUpForm/>}/>
                                    <Route exact path={appRoutesNames.SEARCH} render={() => <SearchPage/>}/>
                                    <Route exact path="/error"
                                           render={() => <ErrorPage errorCode="400" message="ErrorPage"/>}/>

                                    <Route render={() => <ErrorPage errorCode="404" message="Page doesn't exist"/>}/>
                                </Switch>
                            </Box>
                        </Route>
                    </Switch>
                </HandledErrorBoundary>
            </BrowserRouter>
        </div>
    );
}

export default App;
