import React, { useState, useEffect } from 'react';
import { serverUrl } from '../../config';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker, { registerLocale  } from 'react-datepicker';
import bg from "date-fns/locale/bg";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button, Row, Form } from 'react-bootstrap';
import { getToken } from '../../utils/auth';
registerLocale("bg", bg);

const Calendar = () => {
    const [state, setState] = useState({
        title: "",
        start: new Date(),
        end: new Date()
    });

    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState("");

    const getEvents = () => {
        fetch(`${serverUrl}/calendar/getEvents`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken() })
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

    const handleColor = time => {
        return time.getHours() > 12 ? "text-success" : "text-error";
    };

    const handleEventClick = (data: any) => {
        setShow(true);
        setState({ 
            ...state, 
            title: data.event.title,
            start: data.event.start,
            end: data.event.end,
        });
        setIsEdit(true);
        setId(data.event.id);
    };

    const createEvent = async () => {
        const response = await fetch(`${serverUrl}/calendar/create`, {
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
                title: "",
                start: new Date(),
                end: new Date()
            });
            setError("");
            getEvents()
        } else {
            setError(result.status_txt);
            setSuccess("");
        }
    }

    const editEvent = async () => {
        const response = await fetch(`${serverUrl}/calendar/updateEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...state, id, token: getToken()}),
        });
        const result = await response.json();
        if (result.status) {
            setSuccess(result.status_txt);
            setError("");
            getEvents();
        } else {
            setError(result.status_txt);
            setSuccess("");
        }
    }

    const handleAddEventClick = async (e: any) => {
        if (e) e.preventDefault();
        console.log(isEdit)
        if (isEdit) {
            await editEvent();
        } else {
            await createEvent();
        }
        
    };

    const handleDeleteEventClick = async (e: any) => {
        e.preventDefault();
        await fetch(`${serverUrl}/calendar/deleteEvent`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken(), id })
        })
        getEvents();
    }

    const setStartDate = (date: any) => {
        setState({...state, start: new Date(date)});
    };

    const setEndDate = (date: any) => {
        setState({...state, end: new Date(date)});
    };
      
    return (
        <>
            <h1>Календар</h1>
            <FullCalendar 
                    plugins={[dayGridPlugin, interactionPlugin]}
                    editable={true}
                    eventDrop={() => {}}
                    eventClick={(data) => handleEventClick(data)}
                    dateClick={(date) => { 
                        setShow(true);
                        setState({
                            ...state, 
                            title: "",
                            start: new Date(date.dateStr),
                            end: new Date(date.dateStr)
                        })
                    }}
                    events={events}
                    locale="bg"
                    headerToolbar={{ right: "" }}
            />
            <Modal show={show} onHide={() => setIsEdit(false)}>
                <Modal.Dialog style={{ width: "90%" }}>
                    <Modal.Body>
                        <Row className="d-flex justify-content-center">
                            <Form className="col-6">
                                <Form.Group controlId="formBasicTitle">
                                    <Form.Label>Заглавие</Form.Label>
                                    <Form.Control name="title" value={state.title} onChange={handleChange} type="text" placeholder="Заглавие" />
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
                                        onChange={date => setStartDate(date)}
                                        timeClassName={handleColor}
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
                                        onChange={date => setEndDate(date)}
                                        timeClassName={handleColor}
                                        />
                                </Form.Group>
                            </Form>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setShow(false); setIsEdit(false); }}>Затвори</Button>
                        <Button variant="primary" onClick={handleAddEventClick}>Запази</Button>
                        {isEdit && <Button variant="danger" onClick={handleDeleteEventClick}>Изтрий</Button>}
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    )
}

export default Calendar;
