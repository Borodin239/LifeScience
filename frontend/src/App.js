import './App.css';
import React from "react";
import Header from './components/Header/header';
import Home from './components/HomePage/homePage';
import Register from "./components/Register/register";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/navbar";
import Location from "./components/Location/location";
import Login from "./components/Login/login";
import Method from "./components/Method/method";
import Main from "./components/MainPage/mainPage";
import Switch from "react-bootstrap/Switch";

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
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Switch>
                <Route exact path="/main" component={Main}/>
                <Route path="/main/:id" component={Main}/>
            </Switch>
            <Route path="/bradford-assay" component={Method}/>
        </Router>
    );
}

export default App;
