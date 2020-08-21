import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home/home';
import Nav from './components/Nav/nav';
import Login from './components/Login/login';
import Admin from './components/Admin/admin';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
