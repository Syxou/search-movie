import { Router, NextFunction, Request, Response } from "express";
import { type, userInfo } from "os";
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

export default router;
