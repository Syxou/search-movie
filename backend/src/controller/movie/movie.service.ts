import axios from "axios"
import e = require("express");
import { getCustomRepository } from "typeorm";
import { User } from "../user/User.entity";
import UserRepository from "../user/User.repository";
import { Movie } from "./Movie.entity";

export const searchMovies = async (search: string) => {
    const movies = await searchMoviesInApi(search);
    return movies;
}

const searchMoviesInApi = async (search: string) => {
    return axios({
        method: 'get',
        url: `http://www.omdbapi.com/?apikey=d9667a10&s=${search}&type=movie`,
    })
        .then((res) => res.data)
        .catch((err) => err.response)
}

export const addMovie = async (movie: Movie): Promise<Movie | false> => {
    try {
        console.log('addMovie movie', movie)
        const newMovie = new Movie();
        newMovie.imdbID = movie.imdbID;
        newMovie.title = movie.title;
        newMovie.year = movie.year;
        newMovie.poster = movie.poster;
        const savedMovie = await newMovie.save();
        return savedMovie;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const AddFavoriteToUser = async (user: User, movie: Movie) => {
    console.log('AddFavoriteToUser')
    const userRepo = getCustomRepository(UserRepository);
    try {
        const userWithRelation = await User.findOne(user.id, {
            relations: ['favorites']
        })
        const favorites = userWithRelation.favorites;
        console.log(favorites)
        if (favorites) {
            favorites.push(movie)
            userWithRelation.favorites = favorites;
        } else {
            userWithRelation.favorites = [movie]
        }

        return await userRepo.save(userWithRelation);
    } catch (error) {
        console.log(error)
        return 500
    }
}


export const saveFavorite = async (user: User, movie: Movie) => {
    const existUser = await User.findOne({ email: user.email });
    console.log(existUser)
    if (!existUser) {
        return {
            error: true,
            message: 'User not exist'
        }
    }
    const existMovie = await Movie.findOne({ imdbID: movie.imdbID })
    console.log(existMovie)
    if (!existMovie) {
        console.log('newMovie', movie)
        const newMovie = await addMovie(movie);
        if (newMovie) {
            return await AddFavoriteToUser(existUser, newMovie);
        }
    }
    return await AddFavoriteToUser(existUser, existMovie);
}

export const removeFavorite = async (email: string, imdbID: string) => {
    const userRepo = getCustomRepository(UserRepository);
    const existUser = await User.findOne({ email }, {
        relations: ['favorites']
    });
    if (!existUser) {
        return {
            error: true,
            message: 'User not exist'
        }
    }
    try {
        existUser.favorites = existUser.favorites.filter((f) => f.imdbID !== imdbID)
        const deleted = await userRepo.save(existUser);
        console.log(deleted)
        return deleted;
    } catch (error) {
        console.log(error)
        return 500;
    }
    return;
}


export const getFavorites = async (email: string): Promise<User | number> => {
    const userRepo = getCustomRepository(UserRepository);
    try {
        return await userRepo.createQueryBuilder('user')
            .where({ email: email })
            .innerJoinAndSelect('user.favorites', 'favorites')
            .getOne();
    } catch (error) {
        console.log(error)
        return 500;
    }
}