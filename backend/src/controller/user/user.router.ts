import { Router, Request, Response } from "express";
import { tokenValidate } from "../../middlewares/tokenValidate";
import { authGoogle } from "./user.service";

const router = Router();

router.post('/auth', async (req: Request, res: Response) => {
    const { token } = req.body
    const auth = await authGoogle(token);
    if (typeof auth === "number") {
        res.status(500).send('Server Error')
    } else {
        res.send({
            ...auth,
            token,
        })
    }
});

router.get('/heckLogin', tokenValidate, async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const payload = { ...req.payload, token: authorization.split(' ')[1] };
    res.send(payload)
});

export default router;
