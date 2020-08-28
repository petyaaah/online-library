import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Row, Col, Nav } from 'react-bootstrap';
import Users from './users';
import AddUser from './add-user';
import EditUser from './edit-user';
import Calendar from './calendar';
import Books from './books';
import AddBook from './add-book';
import EditBook from './edit-book';

const Admin = () => (
    <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center" xs={12}>
            <Nav>
                <Nav.Item>
                    <Link className="nav-link" to="/admin/users">
                        Users
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/admin/add-user">
                        Add User
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/admin/books">
                        Books
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/admin/add-book">
                        Add Book
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/admin/calendar">
                        Calendar
                    </Link>
                </Nav.Item>
            </Nav>
        </Col>
        <Col xs={12}>
            <Switch>
                <Route path="/admin/users">
                    <Users />
                </Route>
                <Route path="/admin/add-user">
                    <AddUser />
                </Route>
                <Route path="/admin/edit-user/:id">
                    <EditUser />
                </Route>
                <Route path="/admin/books">
                    <Books />
                </Route>
                <Route path="/admin/add-book">
                    <AddBook />
                </Route>
                <Route path="/admin/edit-book/:id">
                    <EditBook />
                </Route>
                <Route path="/admin/calendar">
                    <Calendar />
                </Route>
            </Switch>
        </Col>
    </Row>
);

export default Admin;
