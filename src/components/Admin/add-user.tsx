import React from 'react';
import { Button, Form, Row } from "react-bootstrap";

export default () => (
    <Row className="d-flex justify-content-center">
        <Form className="col-6">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select">
                    <option>Administrator</option>
                    <option>Chief Librarian</option>
                    <option>Librarian</option>
                    <option>Reader</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Add User
            </Button>
        </Form>
    </Row>
)
