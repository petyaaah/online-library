import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';
import {getBranches, getCategories} from "../../utils/constants";

const Books = (props:any) => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [branches, setBranches] = useState([]);

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
        getCategories().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setCategories(result);
        })
        getBranches().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setBranches(result);
        })
    }, []);

    const editBook = (book: any) => {
        props.history.push(`/admin/edit-book/${book.id}`)
    }

    const renderCategory = (id: number) => {
        const category: any = categories.find((category: any) => category.id === Number(id));
        return category.text;
    }

    const renderLibrary = (id: number) => {
        const library: any = branches.find((branch: any) => branch.id === id);
        return library?.text;
    }

    const renderBooks = () =>
    books.map((book: any) => (
        <tr key={book.id}>
            {Object.keys(book).map((key: any) => {
                if (key === "image") {
                    return (
                        <td key={key}><img src={book[key]} width="50" /></td>
                    )
                }
                if (key === 'category') {
                    return (
                        <td key={key}>{renderCategory(book[key])}</td>
                    )
                }
                if (key === 'branch_of_library') {
                    return (
                        <td key={key}>{renderLibrary(book[key])}</td>
                    )
                }
                return (
                    <td key={key}>{book[key]}</td>
                )
            })}
            <td>
                <Button className="mr-1" variant="warning" onClick={() => editBook(book)}>
                    Актуализиране
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
                    <th>Заглавие</th>
                    <th>Автор</th>
                    <th>IBSN</th>
                    <th>Телефон</th>
                    <th>Категория</th>
                    <th>Библиотека</th>
                    <th>Снимка</th>
                    <th>Количество</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                {renderBooks()}
            </tbody>
        </Table>
    );
}

export default withRouter(Books);
