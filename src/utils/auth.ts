import jwt from 'jsonwebtoken';

import { jwtSecret } from '../config'

export const getToken = () => sessionStorage.getItem('token')

export const checkIsAdmin = () => {
    const token = sessionStorage.getItem('token')
    if (!token) return false;
    try {
        const decoded: any = jwt.verify(token || '', jwtSecret)
        return decoded.role === 1
    } catch (e) {
        console.error(e)
        sessionStorage.removeItem('token');
        window.location.reload();
        return false;
    }

}

export const logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
}