import { Router, Request, Response } from "express";
import { getFavorites, removeFavorite, saveFavorite, searchMovies } from "./movie.service";
import { tokenValidate } from "../../middlewares/tokenValidate";
import { User } from "../user/User.entity";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const { s } = req.query;
    console.log(s)
    if (s) {
        res.send(await searchMovies(s as string))
    }
    res.send([])
});

router.get('/favorite', tokenValidate, async (req: Request, res: Response) => {
    const { email } = req.payload;
    const favorites = await getFavorites(email);
    if (typeof favorites === 'number') {
        res.sendStatus(favorites)
    } else {
        res.send(favorites);
    }
});


router.post('/favorite', tokenValidate, async (req: Request, res: Response) => {
    const payload = req.payload;
    const movie = req.body;

    const save = await saveFavorite(payload as User, movie);
    res.send(save)
});

router.delete('/favorite', tokenValidate, async (req: Request, res: Response) => {
    const { email } = req.payload;
    const { imdbID } = req.body;

    const deleted = await removeFavorite(email, imdbID);
    if (typeof deleted === "number") {
        res.sendStatus(deleted)
    }
    res.send(deleted)
});

export default router;
