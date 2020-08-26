import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getToken, checkIsAdmin } from '../../utils/auth'

const Navigation = () => (
    <Navbar bg="light" expand="lg">
        <Link className="navbar-brand" to="/">
            Online Library
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {!getToken() && <Link className="nav-link" to="/login">
                    Login
                </Link>}
                {getToken() && checkIsAdmin() && <Link className="nav-link" to="/admin">
                    Admin
                </Link>}
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
)

export default Navigation;
