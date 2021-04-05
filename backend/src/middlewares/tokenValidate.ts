import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client('1005266927467-r75m0g9pn25q1vkob3hls1h1hvrq4981.apps.googleusercontent.com');

export const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        console.log('!authorization')
        res.sendStatus(403);
    }
    try {
        const token = authorization.split(' ')[1];
        console.log(authorization)
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '1005266927467-r75m0g9pn25q1vkob3hls1h1hvrq4981.apps.googleusercontent.com'
        });
        const { name, email, picture } = ticket.getPayload();
        req.payload = { name, email, picture } as IJsonPayload;
        next();
    } catch (error) {
        console.log(error)
        res.sendStatus(401);
    }

}