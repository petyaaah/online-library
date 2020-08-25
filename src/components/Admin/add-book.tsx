import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';

const AddBook = () => (
    <Row className="d-flex justify-content-center">
        <Form className="col-6">
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" />
            </Form.Group>

            <Form.Group controlId="formBasicAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Author" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Book
            </Button>
        </Form>
    </Row>
);

export default AddBook;
