import './App.css';
import React, {useState} from "react";
import Header from './components/Header/header';
import Register from "./components/Register/register";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/navbar";
import Method from "./components/Method/method";
import Login from "./components/Login/login";
import CategoriesContainer from "./components/Main/Categories/categoriesContainer";
import Home from "./components/Main/HomePage/homePage";
import UserPage from "./components/Main/UserPage/userPage";
import NewArticle from "./components/NewArticle/NewArticle";

function App() {
    const subFolders = [{
        path: "/",
        name: "Home",
    }]

    return (
        <Router>
            <Header/>
            <Navbar/>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/userPage" component={UserPage}/>
            <Route path="/new-article" component={NewArticle}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" render={() => <Login />}/>
            <Route path="/categories/:categoryId?" render={() => <CategoriesContainer />}/>
            <Route path="/bradford-assay">
                <Method link="/bradford-assay" articleId={1}/>
            </Route>
        </Router>
    );
};

export default App;
