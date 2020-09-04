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

export const checkIsChiefLibrarian = () => {
    const token = sessionStorage.getItem('token')
    if (!token) return false;
    try {
        const decoded: any = jwt.verify(token || '', jwtSecret)
        return decoded.role === 2
    } catch (e) {
        console.error(e)
        sessionStorage.removeItem('token');
        window.location.reload();
        return false;
    }
}

export const checkIsLibrarian = () => {
    const token = sessionStorage.getItem('token')
    if (!token) return false;
    try {
        const decoded: any = jwt.verify(token || '', jwtSecret)
        return decoded.role === 3
    } catch (e) {
        console.error(e)
        sessionStorage.removeItem('token');
        window.location.reload();
        return false;
    }
}

export const getBranchOfLibrary = () => {
    const token = getToken();
    if (!token) return false;
    try {
        const decoded: any = jwt.verify(token || '', jwtSecret)
        return decoded.branch_of_library;
    } catch (e) {
        console.error(e)
        return false;
    }
}

export const logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
}