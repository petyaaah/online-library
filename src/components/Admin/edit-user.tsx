import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';

const EditUser = () => {
    const [state, setState] = useState({
        email: '',
        username: '',
        name: '',
        address: '',
        phone: '',
        reader_number: '',
        branch_of_library: '',
        password: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const onSubmit = async (e: any) => {
        if (e) e.preventDefault();
        const response = await fetch(`${serverUrl}/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...state, token: getToken()}),
        });
        const user = await response.json();
    };

    return (
        <Row className="d-flex justify-content-center">
            <Form className="col-6" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter phone" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicReaderNumber">
                    <Form.Label>Reader Number</Form.Label>
                    <Form.Control type="text" name="reader_number" placeholder="Enter reader number" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicBranchOfLibrary">
                    <Form.Label>Branch Of Library</Form.Label>
                    <Form.Control type="text" name="branch_of_library" placeholder="Enter branch of library" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control name="role" as="select" onChange={handleChange}>
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
    );
}

export default EditUser;
