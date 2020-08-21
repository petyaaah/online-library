import React from 'react'
import { Switch, Route, Link } from "react-router-dom";
import { Row, Col, Nav } from "react-bootstrap";
import Users from './users';
import AddUser from './add-user';
import Calendar from './calendar';

export default () => (
    <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center" xs={12}>
            <Nav>
                <Nav.Item>
                    <Link className="nav-link" to="/admin/users">Users</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/admin/add-user">Add User</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/admin/calendar">Calendar</Link>
                </Nav.Item>
            </Nav>
        </Col>
        <Col xs={6}>
            <Switch>
                <Route path="/admin/users">
                    <Users />
                </Route>
                <Route path="/admin/add-user">
                    <AddUser />
                </Route>
                <Route path="/admin/calendar">
                    <Calendar />
                </Route>
            </Switch>
        </Col>
    </Row>
)