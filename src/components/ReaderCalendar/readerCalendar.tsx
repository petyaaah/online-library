import React, { useState, useEffect } from 'react';
import { serverUrl } from '../../config';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker, { registerLocale  } from 'react-datepicker';
import bg from "date-fns/locale/bg";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button, Row, Form, Alert } from 'react-bootstrap';
import { getToken, getBranchOfLibrary } from '../../utils/auth';
registerLocale("bg", bg);

const ReaderCalendar = () => {
    const [state, setState] = useState({
        title: "",
        start: new Date(),
        end: new Date(),
        email: "",
        text: ""
    });

    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getEvents = () => {
        fetch(`${serverUrl}/calendar/getEvents`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ branch_of_library: getBranchOfLibrary(), token: getToken() })
        }).then(response => response.json()).then((resp: any) => {
            setEvents(resp.data)
        }).catch((e: any) => {
            console.log(e)
        })
    }

    useEffect(() => {
        getEvents();
    }, []);

    const [show, setShow] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleEventClick = (data: any) => {
        setShow(true);
        setState({ 
            ...state, 
            title: data.event.title,
            start: data.event.start,
            end: data.event.end
        });
    };

    const handleSendEmail = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`${serverUrl}/calendar/sendEventEmail`, { 
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
            <h1 className="mt-3">Календар</h1>
            <FullCalendar 
                    plugins={[dayGridPlugin, interactionPlugin]}
                    editable={false}
                    eventDrop={() => {}}
                    eventClick={(data) => handleEventClick(data)}
                    events={events}
                    locale="bg"
                    headerToolbar={{ right: "" }}
            />
            <Modal show={show} onHide={() => {}}>
                <Modal.Dialog style={{ width: "90%" }}>
                    <Modal.Body>
                        <Row className="d-flex justify-content-center">
                            <Form className="col-6">
                                <Form.Group controlId="formBasicTitle">
                                    <Form.Label>Заглавие</Form.Label>
                                    <Form.Control name="title" value={state.title} type="text" placeholder="Заглавие" readOnly={true}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicAuthor">
                                    <Form.Label style={{ display: "block" }}>От</Form.Label>
                                    <DatePicker
                                        className="form-control"
                                        locale="bg"
                                        showTimeSelect
                                        timeCaption="Час"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        selected={state.start}
                                        onChange={date => {}}
                                        readOnly={true}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicIBSN">
                                    <Form.Label style={{ display: "block" }}>До</Form.Label>
                                    <DatePicker
                                        className="form-control"
                                        locale="bg"
                                        showTimeSelect
                                        timeCaption="Час"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        selected={state.end}
                                        onChange={date => {}}
                                        readOnly={true}
                                        />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email адрес</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Въведете email адрес" value={state.email} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicText">
                                    <Form.Label>Запитване</Form.Label>
                                    <Form.Control type="text" as="textarea" name="text" placeholder="Запитване" value={state.text} onChange={handleChange} />
                                </Form.Group>

                                {error && <Alert className="mt-5" variant="danger">{error}</Alert>}
                                {success && <Alert className="mt-5" variant="success">{success}</Alert>}
                            </Form>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={() => { 
                                setShow(false);
                                setSuccess("");
                                setError("");
                           }}>
                                Затвори
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={handleSendEmail}>
                                Изпрати
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    )
}

export default ReaderCalendar;
