import React from 'react'
import { Button, Table } from "react-bootstrap";

export default () => (
    <Table striped bordered hover size="sm">
        <thead>
        <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>The Witcher 1</td>
            <td>xxxxxxxxxxxxxx</td>
            <td>Fantasy</td>
            <td>
                <Button className="mr-1" variant="warning">Edit</Button>
                <Button variant="danger">Delete</Button>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>The Witcher 2</td>
            <td>xxxxxxxxxxxxxx</td>
            <td>Fantasy</td>
            <td>
                <Button className="mr-1" variant="warning">Edit</Button>
                <Button variant="danger">Delete</Button>
            </td>
        </tr>
        </tbody>
    </Table>
)