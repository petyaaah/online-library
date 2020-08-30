import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import {Alert, Button, Form, Row} from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';
import {getBranches, getRoles} from "../../utils/constants";

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
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        getRoles().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setRoles(result);
        })
        getBranches().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setBranches(result);
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
        const result = await response.json();
        if (result.status) {
            setSuccess(result.status_txt);
        } else {
            setError(result.status_txt);
        }
    };

    return (
        <Row className="d-flex justify-content-center">
            <Form className="col-6" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" value={state.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Потребителско име</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" value={state.username} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Име</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" value={state.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address" value={state.address} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter phone" value={state.phone} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicReaderNumber">
                    <Form.Label>Читателски номер</Form.Label>
                    <Form.Control type="text" name="reader_number" placeholder="Enter reader number" value={state.reader_number} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicBranchOfLibrary">
                    <Form.Label>Филиал на библиотеката</Form.Label>
                    <Form.Control name="branch_of_library" as="select" value={state.branch_of_library} onChange={handleChange}>
                        { branches.map((b: any) => <option key={b.id} value={b.id}>{b.text}</option>) }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicRole">
                    <Form.Label>Роля</Form.Label>
                    <Form.Control name="role" as="select" value={state.role} onChange={handleChange}>
                        { roles.map((r: any) => <option key={r.id} value={r.id}>{r.text}</option>) }
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Актуализирай потребител
                </Button>
                {error && <Alert className="mt-5" variant="danger">{error}</Alert>}
                {success && <Alert className="mt-5" variant="success">{success}</Alert>}
            </Form>
        </Row>
    );
}

export default withRouter(EditUser);
