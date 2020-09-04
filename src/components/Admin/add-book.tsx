import React, {useEffect, useState} from 'react';
import { Button, Form, Row, Alert } from 'react-bootstrap';
import FileBase64 from 'react-file-base64';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';
import {getBranches, getCategories} from "../../utils/constants";

const AddBook = () => {

    const [categories, setCategories]: any = useState([]);
    const [branches, setBranches]: any = useState([]);
    const [state, setState] = useState({
        title: "",
        author: "",
        IBSN: "",
        category: 1,
        branch_of_library: 1,
        image: "",
        quantity: 1
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        Promise.all([getCategories(), getBranches()]).then(async ([c, b]) => {
            const categoriesResponse = await c.json();
            const branchesResponse = await b.json();
            const categories: any = Object.keys(categoriesResponse.data).map((k: string) => categoriesResponse.data[k]);
            const branches: any = Object.keys(branchesResponse.data).map((k: string) => branchesResponse.data[k]);
            setCategories(categories);
            setBranches(branches);
            setState({ ...state, category: categories[0]?.id, branch_of_library: branches[0]?.id })
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (image: any) => {
        setState({ ...state, image: image.base64 })
    };

    const onSubmit = async (e: any) => {
        if (e) e.preventDefault();
        const response = await fetch(`${serverUrl}/books/create`, {
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
                author: "",
                IBSN: "",
                category: 1,
                branch_of_library: 1,
                image: "",
                quantity: 1
            });
            setError("");
        } else {
            setError(result.status_txt);
            setSuccess("");
        }
    };

    const isFormValid = () => {
        const {title, author, IBSN, category, branch_of_library, image, quantity} = state
        console.log({state})
      
        return title && author && IBSN && category && branch_of_library && image && quantity;
    };

    return (
        <Row className="d-flex justify-content-center">
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
                    <Form.Control name="category" value={state.category} as="select" onChange={handleChange}>
                        { categories.map((c: any) => <option key={c.id} value={c.id}>{c.text}</option>) }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicBranchOfLibrary">
                    <Form.Label>Филиал на библиотеката</Form.Label>
                    <Form.Control name="branch_of_library" value={state.branch_of_library} as="select" onChange={handleChange}>
                        { branches.map((b: any) => <option key={b.id} value={b.id}>{b.text}</option>) }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicImage">
                    {state.image && <img className="mb-3" src={state.image} alt="book_image" style={{ width: '200px' }} />}
                    <FileBase64 onDone={handleImageChange} />
                </Form.Group>

                <Form.Group controlId="formBasicQuantity">
                    <Form.Label>Количество</Form.Label>
                    <Form.Control name="quantity" value={state.quantity} onChange={handleChange} type="number" placeholder="Количество" />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    Добави книга
                </Button>

                {error && <Alert className="mt-5" variant="danger">{error}</Alert>}
                {success && <Alert className="mt-5" variant="success">{success}</Alert>}
            </Form>
        </Row>
    )
}

export default AddBook;
