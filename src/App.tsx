import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Nav from './components/Nav/nav';
import Login from './components/Login/login';
import Admin from './components/Admin/admin';
import './App.css';

import { PrivateRoute, AdminRoute } from './components/PrivateRoute/private-route'

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <AdminRoute path="/admin" component={Admin} />
                    <PrivateRoute exact path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
