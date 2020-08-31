import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'; 
import { Row, Form, Button, Alert } from 'react-bootstrap';
import { serverUrl } from '../../config';

const Login = (props: any) => {

    const [state, setState] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    }

    const onSubmit = async (e: any) => {
        if (e) e.preventDefault();
        const response = await fetch(`${serverUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        });
        const result = await response.json();
        if (result.status) {
            //save token
            try {
                sessionStorage.setItem("token", result.data.token);
                props.history.push('/')
                window.location.reload()
            } catch (error) {
                setError("Нещо се обърка!")
            }
        } else {
            setError(result.status_txt)
        }
    }

    return (
        <Row className="d-flex justify-content-center">
            <Form className="col-6" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Потребителско име</Form.Label>
                    <Form.Control value={state.username} name="username" type="text" placeholder="Въведете потребителско име" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Парола</Form.Label>
                    <Form.Control value={state.password} name="password" type="password" placeholder="Въведете Парола" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Вход
                </Button>
                {error && <Alert className="mt-5" variant="danger">{error}</Alert>}
            </Form>
        </Row>
    )
}

export default withRouter(Login);
