import React from "react";
import {BrowserRouter as Router, NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import Page from "../Page/Page";

const Method = (props) => {

    const link = props.match.url
    const {name, sections} = props;
    // const toLinkPart = (str) => str.replace(/\s+/g, '-').toLowerCase();
    // sections.map((section) => {
    //     section.link = link + "/" + toLinkPart(section.name)
    // })

    return (
        <Router>
            <div className="method-name">
                <h2>
                    {name}
                </h2>
            </div>
            <div className="main">
                <ul className="section-list">
                    {
                        sections.map((section) => (
                            <li className="list-item">
                                <NavLink exact activeClassName="active-section" className="section-link"
                                         to={link + "/" + section.id}>{section.name}</NavLink>
                            </li>
                        ))
                    }
                </ul>
                <Switch>
                    {
                        <Redirect exact from={link} to={link + "/" + sections[0].id}/>
                    }
                </Switch>
                <Switch>
                    {
                        sections.map((section) => (
                            <Route path={link + "/" + section.id}>
                                {
                                    <Page text={section.id + " " + section.name}/>
                                }
                            </Route>
                        ))

                    }
                </Switch>
            </div>
        </Router>
    )
}

export default withRouter(Method)