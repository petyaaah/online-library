import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';

const Books = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch(`${serverUrl}/books/getBooks`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken() })
        }).then(response => response.json()).then((resp: any) => {
            setBooks(resp.data)
        }).catch((e: any) => {
            console.log(e)
        })
    }, []);

    const renderBooks = () =>
    books.map((book: any) => (
        <tr key={book.id}>
            {Object.keys(book).map((key: any) => {
                if (key === "image") {
                    return (
                        <td key={key}><img src={book[key]} width="50" /></td>
                    )
                }
                return (
                    <td key={key}>{book[key]}</td>
                )
            })}
            <td>
                <Button className="mr-1" variant="warning">
                    Edit
                </Button>
                <Button variant="danger" onClick={() => deleteBook(book)}>Delete</Button>
            </td>
        </tr>
    ))

    const deleteBook = async (book: any) => {
        const result = await fetch(`${serverUrl}/books/deleteBook`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken(), id: book.id })
        })
        setBooks(books.filter((u: any) => u.id !== book.id))
        console.log(result)
    }

    return (
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>IBSN</th>
                    <th>Category</th>
                    <th>Phone</th>
                    <th>Library</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderBooks()}
            </tbody>
        </Table>
    );
}

export default Books;
