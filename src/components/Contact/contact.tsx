import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Alert, Button } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken, checkIsAdmin, getBranchOfLibrary } from '../../utils/auth';

const Contact = () => {
    const [state, setState] = useState({
        email: "",
        text: ""
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSendEmail = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`${serverUrl}/contact/sendEmail`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...state, token: getToken() })
        });

        const result = await response.json();
        if (result.status) {
            setSuccess(result.status_txt);
            setState({...state, email: "", text: "",});
            setError("");
        } else {
            setError(result.status_txt);
            setSuccess("");
        }
    };
    
    return (
        <>
            <h1 className="mt-5 mb-5">Контакти</h1>
            <Container>
                <Row>
                    { getBranchOfLibrary() === 1 || getBranchOfLibrary() === "" ?
                    <iframe
                        style={{ width: "100%", height: "300px" }} 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5864.88348723003!2d23.325159548517554!3d42.6943663736487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8572c7d18907%3A0xa0b0d9b04d2d9869!2z0KHRgtC-0LvQuNGH0L3QsCDQsdC40LHQu9C40L7RgtC10LrQsA!5e0!3m2!1sbg!2sbg!4v1407748513088"
                    ></iframe>
                    : <iframe 
                        style={{ width: "100%", height: "300px" }} 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2958.509211159548!2d24.74385041544928!3d42.13938897920234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd1b1125fbb17%3A0x76082f6ba5e6415!2s%22Ivan%20Vazov%22%20Public%20Library!5e0!3m2!1sen!2sbg!4v1599398798125!5m2!1sen!2sbg"></iframe>
                    }
                </Row>
                <hr />
                <Row>
                    <Col sm="12" style={{ textAlign: "left" }}>
                        {getBranchOfLibrary() === 1 || getBranchOfLibrary() === "" ?
                        <div>
                            <p>Име: Петя ;д</p>
                            <p>Длъжност: И.Д. Зам.-директор по библиотечната дейност</p>
                            <p>Адрес: 1000 София пл. Славейков 4</p>
                            <p>Телефон: 987 17 60</p>
                        </div>
                        :
                        <div>
                            <p>Име: Петя ;д</p>
                            <p>Длъжност: заместник-директор</p>
                            <p>Адрес: 4000 Пловдив ул. "Авксентий Велешки" № 17</p>
                            <p>Телефон: (+ 359 32) karta654 901, 912</p>
                        </div>
                        }
                    </Col>
                </Row>
                <hr />
                <Row className="mt-5">
                    <Col sm="12">
                    <h4>Изпрати запитване</h4>
                        <Form className="col-6" style={{ margin: "0 auto" }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email адрес</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Въведете email адрес" value={state.email} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicText">
                                <Form.Label>Запитване</Form.Label>
                                <Form.Control type="text" as="textarea" name="text" placeholder="Запитване" value={state.text} onChange={handleChange} />
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                onClick={handleSendEmail}>
                                Изпрати
                            </Button>

                            {error && <Alert className="mt-5" variant="danger">{error}</Alert>}
                            {success && <Alert className="mt-5" variant="success">{success}</Alert>}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Contact;
