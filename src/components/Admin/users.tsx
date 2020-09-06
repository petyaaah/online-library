import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { serverUrl } from '../../config';
import { getToken } from '../../utils/auth';
import {withRouter} from "react-router-dom";
import {getBranches, getRoles} from "../../utils/constants";

const Users = (props: any) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);

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
        getRoles().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            console.log(result)
            setRoles(result);
        })
        getBranches().then((resp:any) => resp.json()).then((response: any) => {
            const result: any = Object.keys(response.data).map((k: string) => response.data[k]);
            setBranches(result);
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
    }

    const approve = async (id: number) => {
        const result = await fetch(`${serverUrl}/users/approveUser`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: getToken(), id })
        });

        if (result.status) {
            const updatedUsers: any = users.map((u: any) => {
                if (u.id === id) {
                    u.approved = true;
                }
                return u;
            });

            setUsers(updatedUsers);
        }
    }

    const approveBtn = (id: number) => {
        return (
            <Button variant="primary" onClick={() => approve(id)}>
                Потвърди
            </Button>
        )
    };
    const editUser = (user: any) => {
        props.history.push(`/admin/edit-user/${user.id}`)
    }

    const renderRole = (id: number) => {
        const role: any = roles.find((role: any) => role.id === id);
        return role.text;
    }

    const renderLibrary = (id: number) => {
        const library: any = branches.find((branch: any) => branch.id === id);
        return library.text;
    }
    
    const renderUsers = () =>
        users.map((user: any) => (
            <tr key={user.id}>
                {Object.keys(user).map((key: any) => {
                    if (key === 'approved') {
                        return (
                            <td key={key}>{user[key] ? 'Да' : approveBtn(user.id)}</td>
                        )
                    }
                    if (key === 'role') {
                        return (
                            <td key={key}>{renderRole(user.role)}</td>
                        )
                    }
                    if (key === 'branch_of_library') {
                        return (
                            <td key={key}>{renderLibrary(user.branch_of_library)}</td>
                        )
                    }
                    return (
                        <td key={key}>{user[key]}</td>
                    )
                })}
                <td>
                    <Button className="mr-1" variant="warning" onClick={() => editUser(user)}>
                        Актуализиране
                    </Button>
                </td>
                <td>
                    <Button variant="danger" onClick={() => deleteUser(user)}>Изтриване</Button>
                </td>
            </tr>
        ))

    return (
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Потребителско име</th>
                    <th>Име</th>
                    <th>Адрес</th>
                    <th>Телефон</th>
                    <th>Читателски номер</th>
                    <th>Дата</th>
                    <th>Филиал на библиотеката</th>
                    <th>Email</th>
                    <th>Роля</th>
                    <th>Потвърден</th>
                    <th>#</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {renderUsers()}
            </tbody>
        </Table>
    );
}

export default withRouter(Users);
