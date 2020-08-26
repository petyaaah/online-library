import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`${serverUrl}/users/getUsers`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken() })
        }).then(response => response.json()).then((resp: any) => {
            setUsers(resp.data)
        }).catch((e: any) => {
            console.log(e)
        })
    }, [])

    const deleteUser = async (user: any) => {
        const result = await fetch(`${serverUrl}/users/deleteUser`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken(), id: user.id })
        })
        setUsers(users.filter((u: any) => u.id !== user.id))
        console.log(result)
    }

    
    const renderUsers = () =>
        users.map((user: any) => (
            <tr>
                {Object.keys(user).map((key: any) => {
                    if (key === 'approved') {
                        return (
                            <td>{user[key] ? 'Yes' : 'No'}</td>
                        )
                    }
                    return (
                        <td>{user[key]}</td>
                    )
                })}
                <td>
                    <Button className="mr-1" variant="warning">
                        Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleteUser(user)}>Delete</Button>
                </td>
            </tr>
        ))

    return (
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Number</th>
                    <th>Date</th>
                    <th>Library</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Approved</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderUsers()}
            </tbody>
        </Table>
    );
}

export default Users;
