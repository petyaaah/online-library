import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Nav from './components/Nav/nav';
import Login from './components/Login/login';
import Admin from './components/Admin/admin';
import './App.css';

import { PrivateRoute, AdminRoute } from './components/PrivateRoute/private-route'
import { Container } from 'react-bootstrap';

function App() {
    return (
        <Router>
            <div className="App d-flex flex-column h-100">
                <Nav />
                <Container className="mb-5" style={{ minHeight: "800px" }}>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <AdminRoute path="/admin" component={Admin} />
                        <PrivateRoute exact path="/" component={Home} />
                    </Switch>
                </Container>
                <footer className="footer mt-auto py-3" style={{ backgroundColor: '#f5f5f5' }}>
                    <div className="container">
                        <span className="text-muted">Books Store - 2020</span>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
