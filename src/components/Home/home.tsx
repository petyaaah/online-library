import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken, checkIsAdmin, getBranchOfLibrary } from '../../utils/auth';

const Home = () => {
    const [books, setBooks] = useState([]);
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
        }).catch((e: any) => {
            console.log(e)
        })
    }, []);

    const renderBooks = () =>
    books.map((book: any) => (
        <Col xs={3} className="mr-5 mb-5 homepage-cards" key={book.id}>
            <Card style={{ width: '18rem' }}>
                <div className="card-image">
                    <Card.Img variant="top" src={book.image} />
                </div>
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text style={{ textAlign: 'left' }}>
                        <p><b>Автор:</b> {book.author}</p>
                        <p><b>IBSN:</b> {book.IBSN}</p>
                        <p><b>Категория:</b> {book.category}</p>
                        <p><b>Количество:</b> {book.quantity}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    ))
    
    return (
        <>
            <h1 className="mt-5 mb-5">Book Store</h1>
            <Container>
                <Row>
                    { renderBooks() }
                </Row>
            </Container>
        </>
    )
}

export default Home;
