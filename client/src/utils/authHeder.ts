import auth from "./auth"

export const authHeader = () => {
    const token = auth.token;
    let value: any = {};
    if (token) {
        value['Authorization'] = `Bearer ${token}`
    }
    return value;
}