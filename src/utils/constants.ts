import { serverUrl } from "../config";
import { getToken } from "./auth";

export const getRoles = async () =>
    await fetch(`${serverUrl}/roles/getRoles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: getToken() })
    });

export const getBranches = async () =>
    await fetch(`${serverUrl}/branches/getBranchesOfLibrary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: getToken() })
    });

export const getCategories = async () =>
    await fetch(`${serverUrl}/categories/getBookCategories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: getToken() })
    });
