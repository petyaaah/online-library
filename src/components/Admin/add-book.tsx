import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import FileBase64 from 'react-file-base64';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';

const AddBook = () => {

    const [state, setState] = useState({
        title: "",
        author: "",
        IBSN: "",
        category: "",
        branch_of_library: "",
        image: "",
        quantity: 1
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }= e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleImageChange = (image: any) => {
        setState({ ...state, image: image.base64 })
    }

    const onSubmit = async (e: any) => {
        if (e) e.preventDefault();
        const response = await fetch(`${serverUrl}/books/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...state, token: getToken()}),
        });
        const book = await response.json();
    }

    return (
        <Row className="d-flex justify-content-center">
            <Form className="col-6" onSubmit={onSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" value={state.title} onChange={handleChange} type="text" placeholder="Title" />
                </Form.Group>

                <Form.Group controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control name="author" value={state.author} onChange={handleChange} type="text" placeholder="Author" />
                </Form.Group>

                <Form.Group controlId="formBasicIBSN">
                    <Form.Label>IBSN</Form.Label>
                    <Form.Control name="IBSN" value={state.IBSN} onChange={handleChange} type="text" placeholder="IBSN" />
                </Form.Group>

                <Form.Group controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control name="category" value={state.category} onChange={handleChange} type="text" placeholder="Category" />
                </Form.Group>

                <Form.Group controlId="formBasicBranchOfLibrary">
                    <Form.Label>Branch Of Library</Form.Label>
                    <Form.Control name="branch_of_library" value={state.branch_of_library} onChange={handleChange} type="text" placeholder="Branch Of Library" />
                </Form.Group>

                <Form.Group controlId="formBasicImage">
                    <FileBase64 onDone={handleImageChange} />
                </Form.Group>

                <Form.Group controlId="formBasicQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control name="quantity" value={state.quantity} onChange={handleChange} type="number" placeholder="Quantity" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Book
                </Button>
            </Form>
        </Row>
    )
}

export default AddBook;
