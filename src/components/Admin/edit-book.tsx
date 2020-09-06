import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import {Alert, Button, Form, Row} from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';
import {getBranches, getCategories} from "../../utils/constants";

const EditBook = (props: any) => {

    const [state, setState] = useState({
        title: "",
        author: "",
        IBSN: "",
        category: "",
        branch_of_library: "",
        image: "",
        quantity: 1,
    })
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [categories, setCategories] = useState([]);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        fetch(`${serverUrl}/books/getBook`, {
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
        getCategories().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setCategories(result);
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

    const handleImageChange = (image: any) => {
        setState({ ...state, image: image.base64 })
    };

    const onSubmit = async (e: any) => {
        if (e) e.preventDefault();
        const response = await fetch(`${serverUrl}/books/updateBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...state, token: getToken()}),
        });
        const result = await response.json();
        if (result.status) {
            setSuccess(result.status_txt);
            setError("");
        } else {
            setError(result.status_txt);
            setSuccess("");
        }
    };

    const isFormValid = () => {
        const {title, author, IBSN, category, branch_of_library, image, quantity} = state

        return title && author && IBSN && category && branch_of_library && image && quantity;
    };

    return (
        <Row className="d-flex justify-content-center mt-5">
            <Form className="col-6" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Заглавие</Form.Label>
                    <Form.Control name="title" value={state.title} onChange={handleChange} type="text" placeholder="Заглавие" />
                </Form.Group>

                <Form.Group controlId="formBasicAuthor">
                    <Form.Label>Автор</Form.Label>
                    <Form.Control name="author" value={state.author} onChange={handleChange} type="text" placeholder="Автор" />
                </Form.Group>

                <Form.Group controlId="formBasicIBSN">
                    <Form.Label>IBSN</Form.Label>
                    <Form.Control name="IBSN" value={state.IBSN} onChange={handleChange} type="text" placeholder="IBSN" />
                </Form.Group>

                <Form.Group controlId="formBasicCategory">
                    <Form.Label>Категория</Form.Label>
                    <Form.Control name="category" as="select" value={state.category} onChange={handleChange}>
                        { categories.map((c: any) => <option key={c.id} value={c.id}>{c.text}</option>) }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicBranchOfLibrary">
                    <Form.Label>Филиал на библиотеката</Form.Label>
                    <Form.Control name="branch_of_library" as="select" value={state.branch_of_library} onChange={handleChange}>
                        { branches.map((b: any) => <option key={b.id} value={b.id}>{b.text}</option>) }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicImage">
                    <img className="mb-3" src={state.image} alt="book_image" style={{ width: '200px' }} />
                    <FileBase64 onDone={handleImageChange} />
                </Form.Group>

                <Form.Group controlId="formBasicQuantity">
                    <Form.Label>Количество</Form.Label>
                    <Form.Control name="quantity" value={state.quantity} onChange={handleChange} type="number" placeholder="Количество" />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    Актуализирай книга
                </Button>

                {error && <Alert className="mt-5" variant="danger">{error}</Alert>}
                {success && <Alert className="mt-5" variant="success">{success}</Alert>}
            </Form>
        </Row>
    );
}

export default withRouter(EditBook);
