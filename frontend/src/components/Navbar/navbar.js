import React, {Fragment} from "react";
import './navbar.css';
import NavLink from "./NavLink/navlink";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/*<NavLink path="/">*/}
                    {/*    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>*/}
                    {/*</NavLink>*/}
                    <NavLink path="/" name="Home"/>
                    <NavLink path="/categories" name="Categories"/>
                    <NavLink path="/link2" name="Link2"/>
                    <NavLink path="/bradford-assay" name="Bradford"/>
                </ul>
                <form className="form-inline ml-auto p-2">
                    <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;