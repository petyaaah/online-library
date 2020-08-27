import { serverUrl } from "../config";
import { getToken } from "./auth";

export const getRoles = async () => {
    const result: any = await fetch(`${serverUrl}/roles/getRoles`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: getToken() })
    });

    return result;
}