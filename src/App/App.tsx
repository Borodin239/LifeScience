import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HandledErrorBoundary from "../components/boundary/HandledErrorBoundary";
import MainAppBar from "../components/layouts/MainAppBar/MainAppBar";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import {SignInForm} from "../components/auth-forms/SignInForm/SignInForm";
import {SignUpForm} from "../components/auth-forms/SignUpForm/SignUpForm";
import appRoutesNames from "../infrastructure/common/appRoutesNames";
import HomePage from "../pages/HomePage/HomePage";
import MethodPage from "../pages/MethodPage/MethodPage";
import {useAppStyles} from "./useAppStyles";

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
        <div className={classes.app}>
            <BrowserRouter>
                <HandledErrorBoundary>
                    <MainAppBar/>
                    <Switch>
                        {/*<Route exact path="/login"*/}
                        {/*       component={AuthPage}*/}
                        {/*/>*/}

                        <Route exact path="/">
                            <Redirect to={appRoutesNames.HOME}/>
                        </Route>

                        <Route exact path={appRoutesNames.HOME} render={() => <HomePage/>}/>
                        <Route exact path={`${appRoutesNames.CATEGORIES}/:categoryId(\\d*)`} render={() => <CategoryPage/>}/>
                        <Route exact path={appRoutesNames.SIGN_IN} render={() => <SignInForm/>}/>
                        <Route exact path={appRoutesNames.SIGN_UP} render={() => <SignUpForm/>}/>
                        <Route exact path={"/method-layout"} render={() => <MethodPage/>}/>
                        <Route exact path="/error"
                               render={() => <ErrorPage errorCode="400" message="ErrorPage"/>}/>

                        <Route render={() => <ErrorPage errorCode="404" message="Page doesn't exist"/>}/>
                    </Switch>
                </HandledErrorBoundary>
            </BrowserRouter>
        </div>
    );
}

export default App;
