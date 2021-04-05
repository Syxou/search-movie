import { getRepository } from "typeorm";
import { Router, NextFunction, Request, Response } from "express";
import { searchMovies } from "./MovieService";

const router = Router();

router.get('/movies', async (req: Request, res: Response) => {
    const { s } = req.query;
    console.log(s)
    if (s) {
        res.send(await searchMovies(s as string))
    }
    res.send([])
});

export default router;
