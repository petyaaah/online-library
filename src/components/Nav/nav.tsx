import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getToken, checkIsAdmin, logout, checkIsChiefLibrarian, checkIsLibrarian } from '../../utils/auth'

const Navigation = () => (
    <Navbar className="site-header" expand="lg">
        <Link className="navbar-brand" to="/">
            Портал на библиотеката
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {!getToken() && <Link className="nav-link" to="/login">
                    Вход
                </Link>}
                {!getToken() && <Link className="nav-link" to="/register">
                    Регистрация
                </Link>}
                {getToken() && (checkIsAdmin() || checkIsChiefLibrarian() || checkIsLibrarian()) && <Link className="nav-link" to="/admin">
                    Админ
                </Link>}
            </Nav>
            {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form> */}
            {getToken() && <Button variant="default" className="ml-5" onClick={logout}>
                    Изход
            </Button>}
        </Navbar.Collapse>
    </Navbar>
)

export default Navigation;
