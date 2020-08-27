import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Row } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';

const EditUser = (props: any) => {

    const [state, setState] = useState({
        email: '',
        username: '',
        name: '',
        address: '',
        phone: '',
        reader_number: '',
        branch_of_library: '',
        role: '',
    })

    useEffect(() => {
        fetch(`${serverUrl}/users/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken(), id: props.match.params.id })
        }).then(response => response.json()).then((resp: any) => {
            setState(resp.data)
        }).catch((e: any) => {
            console.log(e)
        })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const onSubmit = async (e: any) => {
        if (e) e.preventDefault();
        const response = await fetch(`${serverUrl}/users/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...state, token: getToken()}),
        });
        const user = await response.json();
        console.log({ user })
    };

    return (
        <Row className="d-flex justify-content-center">
            <Form className="col-6" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" value={state.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" value={state.username} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" value={state.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address" value={state.address} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter phone" value={state.phone} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicReaderNumber">
                    <Form.Label>Reader Number</Form.Label>
                    <Form.Control type="text" name="reader_number" placeholder="Enter reader number" value={state.reader_number} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicBranchOfLibrary">
                    <Form.Label>Branch Of Library</Form.Label>
                    <Form.Control type="text" name="branch_of_library" placeholder="Enter branch of library" value={state.branch_of_library} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control name="role" as="select" value={state.role} onChange={handleChange}>
                        <option>Administrator</option>
                        <option>Chief Librarian</option>
                        <option>Librarian</option>
                        <option>Reader</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update User
                </Button>
            </Form>
        </Row>
    );
}

export default withRouter(EditUser);
