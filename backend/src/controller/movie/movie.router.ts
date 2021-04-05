import { getRepository } from "typeorm";
import { Router, NextFunction, Request, Response } from "express";
import { searchMovies } from "./MovieService";
import { tokenValidate } from "../../middlewares/tokenValidate";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const { s } = req.query;
    console.log(s)
    if (s) {
        res.send(await searchMovies(s as string))
    }
    res.send([])
});

router.get('/favourites', tokenValidate, async (req: Request, res: Response) => {
    const payload = req.payload;
    console.log(payload)
});

export default router;
