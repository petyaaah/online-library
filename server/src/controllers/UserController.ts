import { Request, Response } from 'express';

import User from '../models/Users';
import IResponse from '../interfaces/IResponse';
import Roles from '../constants/Roles';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        let response: IResponse = {
            status: 0,
            status_txt: 'Username already exists!',
            data: {}
        };

        const user = await User.findAll<User>({ where: { username: body.username }, plain: true, raw: true});
        if (user) {
            return res.json(response);
        }
        const bcrypt = require('bcrypt');
        const hash = bcrypt.hashSync(body.password, 10);
        body.password = hash;
        if (!body.role) {
            body.role = Roles.reader.id;
        }
        const newUser: any = await User.create<User>(body);
        response = {
            status: 1,
            status_txt: 'User created!',
            data: {
                username: newUser.username
            }
        };
        return res.json(response);

    } catch (e) {
        console.log(e)
        const response: IResponse = {
            status: 0,
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.findAll<User>();

        const response = {
            status: 1,
            status_txt: 'OK',
            data: users
        };
        
        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findAll<User>({ where: { id: req.body.id }, plain: true, raw: true});

        const response = {
            status: 1,
            status_txt: 'OK',
            data: user
        };

        
        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        let response: IResponse = {
            status: 0,
            status_txt: 'User update unsuccessful!',
            data: []
        };

        const result = await User.update<User>(body, { where: {id: body.id} });

        if (result) {
            const updatedUser: any = await User.findAll<User>({ where: { id: body.id }, plain: true, raw: true});
            delete updatedUser.password;
            response = {
                status: 1,
                status_txt: 'User updated successful!',
                data: updatedUser
            };
        }

        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.destroy({ where: { id: req.body.id } });
        const response = {
            status: 1,
            status_txt: 'OK',
            data: user
        };

        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}