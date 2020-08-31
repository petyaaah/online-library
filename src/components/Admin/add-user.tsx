import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Alert } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';
import {getRoles, getBranches} from '../../utils/constants';

const AddUser = () => {
    const [state, setState] = useState({
        email: '',
        username: '',
        name: '',
        address: '',
        phone: '',
        reader_number: '',
        branch_of_library: '',
        password: '',
        role: '',
    });

    const [roles, setRoles]: any = useState([]);
    const [branches, setBranches]: any = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getRoles().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setRoles(result);
        })
        getBranches().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setBranches(result);
        })
        Promise.all([getRoles(), getBranches()]).then(async ([r, b]) => {
            const rolesResponse = await r.json();
            const branchesResponse = await b.json();
            const roles: any = Object.keys(rolesResponse.data).map((k: string) => rolesResponse.data[k]);
            const branches: any = Object.keys(branchesResponse.data).map((k: string) => branchesResponse.data[k]);
            setRoles(roles);
            setBranches(branches);
            setState({ ...state, role: roles[0]?.id, branch_of_library: branches[0]?.id })
        });
    }, []);

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
        const result = await response.json();
        if (result.status) {
            setSuccess(result.status_txt);
            setState({
                email: '',
                username: '',
                name: '',
                address: '',
                phone: '',
                reader_number: '',
                branch_of_library: '',
                password: '',
                role: '',
            })
        } else {
            setError(result.status_txt);
        }
    };

    const isFormValid = () => {
        const {email, username, name, address, phone, reader_number, branch_of_library, password} = state
      
        return email && username && name && address && phone && reader_number && branch_of_library && password;
    };

    return (
        <Row className="d-flex justify-content-center">
            <Form className="col-6" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Потребителско име</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Име</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter phone" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicReaderNumber">
                    <Form.Label>Читателски номер</Form.Label>
                    <Form.Control type="text" name="reader_number" placeholder="Enter reader number" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicBranchOfLibrary">
                    <Form.Label>Филиал на библиотеката</Form.Label>
                    <Form.Control name="branch_of_library" as="select" onChange={handleChange}>
                        { branches.map((b: any) => <option key={b.id} value={b.id}>{b.text}</option>) }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Парола</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicRole">
                    <Form.Label>Роля</Form.Label>
                    <Form.Control name="role" as="select" onChange={handleChange}>
                        { roles.map((r: any) => <option key={r.id} value={r.id}>{r.text}</option>) }
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    Add User
                </Button>
                {error && <Alert className="mt-5" variant="danger">{error}</Alert>}
                {success && <Alert className="mt-5" variant="success">{success}</Alert>}
            </Form>
        </Row>
    );
}

export default AddUser;
