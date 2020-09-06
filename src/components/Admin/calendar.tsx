import React, { useState, useEffect } from 'react';
import { serverUrl } from '../../config';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker, { registerLocale  } from 'react-datepicker';
import bg from "date-fns/locale/bg";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button, Row, Form, Alert } from 'react-bootstrap';
import { getToken, checkIsAdmin, checkIsChiefLibrarian, checkIsLibrarian, getBranchOfLibrary } from '../../utils/auth';
import { getBranches } from '../../utils/constants';
registerLocale("bg", bg);

const Calendar = () => {
    const [state, setState] = useState({
        title: "",
        start: new Date(),
        end: new Date(),
        branch_of_library: 1
    });

    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState("");
    const [branches, setBranches]: any = useState([]);

    const getEvents = () => {
        let branch_of_library = null;
        if (checkIsChiefLibrarian() || checkIsLibrarian()) {
            branch_of_library = getBranchOfLibrary();
        }
        fetch(`${serverUrl}/calendar/getEvents`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ branch_of_library, token: getToken() })
        }).then(response => response.json()).then((resp: any) => {
            setEvents(resp.data)
        }).catch((e: any) => {
            console.log(e)
        })
    }

    useEffect(() => {
        getEvents();

        getBranches().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setBranches(result);
        })
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
        const event: any = events.filter((e:any) => e.id === Number(data.event.id));
        setShow(true);
        setState({ 
            ...state, 
            title: data.event.title,
            start: data.event.start,
            end: data.event.end,
            branch_of_library: event[0].branch_of_library,
        });
        setIsEdit(true);
        setId(data.event.id);
    };

    const createEvent = async () => {
        if (checkIsChiefLibrarian() || checkIsLibrarian()) {
            setState({...state, branch_of_library: getBranchOfLibrary()})
        }
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
                end: new Date(),
                branch_of_library: 1,
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
        if (isEdit) {
            await editEvent();
        } else {
            await createEvent();
        }
        
    };

    const handleDeleteEventClick = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`${serverUrl}/calendar/deleteEvent`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken(), id })
        })
        const result = response.json();
        setIsEdit(false);
        setState({
            title: "",
            start: new Date(),
            end: new Date(),
            branch_of_library: 1,
        });
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
            <h1 className="mt-3">Календар</h1>
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

                                {checkIsAdmin() && <Form.Group controlId="formBasicBranchOfLibrary">
                                    <Form.Label>Филиал на библиотеката</Form.Label>
                                    <Form.Control name="branch_of_library" value={state.branch_of_library} as="select" onChange={handleChange}>
                                        { branches.map((b: any) => <option key={b.id} value={b.id}>{b.text}</option>) }
                                    </Form.Control>
                                </Form.Group>}

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
                                setIsEdit(false); 
                                setSuccess("");
                                setError("");
                           }}>
                                Затвори
                        </Button>
                        <Button variant="primary" onClick={handleAddEventClick}>Запази</Button>
                        {isEdit && <Button variant="danger" onClick={handleDeleteEventClick}>Изтрий</Button>}
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    )
}

export default Calendar;
