import React, { useState } from 'react';
import { serverUrl } from '../../config';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Right } from 'react-bootstrap/lib/Media';
import { Modal, Button } from 'react-bootstrap';

const Calendar = () => {
    const [state, setState] = useState({
        title: ""
    })
    const [show, setShow] = useState(false);

    const formatEvents = () => {
        let startTime = new Date()
        let endTime = new Date()

        return [{
            title: 'my event',
            start: startTime,
            end: endTime
        }]
    }

    const handleEventClick = (data) => {
        setShow(true);
        setState({ ...state, title: data.event.title });
    }
      
    return (
        <>
            <h1>Календар</h1>
            <FullCalendar 
                    plugins={[dayGridPlugin, interactionPlugin]}
                    editable={true}
                    eventDrop={() => {}}
                    eventClick={(data) => handleEventClick(data)}
                    events={formatEvents()}
                    locale="bg"
                    headerToolbar={{ right: "" }}
            />
            <Modal show={show} onHide={() => {}}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>{state.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Modal body text goes here.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setShow(false) }}>Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    )
}

export default Calendar;
