import React from 'react';
import { Table, Button } from 'react-bootstrap';

const Users = () => (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>user1@gmail.com</td>
                <td>
                    <Button className="mr-1" variant="warning">
                        Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>user2@gmail.com</td>
                <td>
                    <Button className="mr-1" variant="warning">
                        Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                </td>
            </tr>
        </tbody>
    </Table>
);

export default Users;
