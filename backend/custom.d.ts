interface IJsonPayload {
    name: string,
    email: string,
    picture: string,
}

declare namespace Express {
    export interface Request {
        payload?: IJsonPayload
    }
}