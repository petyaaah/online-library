import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken, checkIsAdmin, getBranchOfLibrary } from '../../utils/auth';
import { getCategories } from "../../utils/constants";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const branch_of_library = checkIsAdmin() ? false : getBranchOfLibrary();
        fetch(`${serverUrl}/books/getBooks`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken(), branch_of_library })
        }).then(response => response.json()).then((resp: any) => {
            setBooks(resp.data)
            setFilteredBooks(resp.data)
        }).catch((e: any) => {
            console.log(e)
        })
        getCategories().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setCategories(result);
        })
    }, []);

    const renderCategory = (id: number) => {
        const category: any = categories.find((category: any) => category.id === Number(id));
        return category.text;
    }

    const renderBooks = () =>
        filteredBooks.map((book: any) => (
            <Col xs={3} className="mr-5 mb-5 homepage-cards" key={book.id}>
                <Card style={{ width: '18rem' }}>
                    <div className="card-image">
                        <Card.Img variant="top" src={book.image} />
                    </div>
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text style={{ textAlign: 'left' }}>
                            <b>Автор:</b> {book.author}
                        </Card.Text>
                        <Card.Text style={{ textAlign: 'left' }}>
                            <b>IBSN:</b> {book.IBSN}
                        </Card.Text>
                        <Card.Text style={{ textAlign: 'left' }}>
                            <b>Категория:</b> {renderCategory(book.category)}
                        </Card.Text>
                        <Card.Text style={{ textAlign: 'left' }}>
                            <b>Количество:</b> {book.quantity === 0 ? 'Изчерпана' : book.quantity}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))

    const onSearch = (e: any) => {
        if (e.target.value === '') {
            setFilteredBooks(books)
            return;
        }
        const results = books.filter((book: any) => book.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
        setFilteredBooks(results)
    }

    const onFilterCategory = (e: any) => {
        const id = e.target.value;
        if (id === '0') {
            setFilteredBooks(books);
            return;
        }
        const results = books.filter((book: any) => book.category === id)
        setFilteredBooks(results);
    };

    const onFilterByAvailability = (e: any) => {
        if (!e.target.checked) {
            setFilteredBooks(books);
            return;
        }
        const results = books.filter((book: any) => book.quantity > 0);
        setFilteredBooks(results);
    }
    
    return (
        <>
            <h1 className="mt-5 mb-5">Библиотека</h1>
            <Container>
                <Form className="mt-5 mb-5 pl-2">
                    <Form.Row>
                        <Form.Group className="mr-5" controlId="formBasicCategory">
                            <Form.Label>Търси по заглавие</Form.Label>
                            <Form.Control placeholder="Search" onChange={onSearch} />
                        </Form.Group>
                        <Form.Group className="mr-5" controlId="formBasicCategory">
                            <Form.Label>Филтриране по категория</Form.Label>
                            <Form.Control name="category" as="select" onChange={onFilterCategory}>
                                <option value={0}>Всички</option>
                                { categories.map((c: any) => <option key={c.id} value={c.id}>{c.text}</option>) }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="pt-5" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Филтриране по наличност" onChange={onFilterByAvailability} />
                        </Form.Group>
                    </Form.Row>
                </Form>
                <Row>
                    { renderBooks() }
                </Row>
            </Container>
        </>
    )
}

export default Home;
