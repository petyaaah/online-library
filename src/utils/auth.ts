import jwt from 'jsonwebtoken';

import { jwtSecret } from '../config'

export const getToken = () => sessionStorage.getItem('token')

export const checkIsAdmin = () => {
    const token = sessionStorage.getItem('token')
    if (!token) return false;
    const decoded: any = jwt.verify(token || '', jwtSecret)
    return decoded.role === 1
}