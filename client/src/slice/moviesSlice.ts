import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../app/store';
import auth from '../utils/auth';

export interface Movies {
    Search?: Favorites[],
    totalResults?: number,
    Response?: string,
    Error?: string,
}
export interface Favorites {
    id: number,
    imdbID: string,
    title: string,
    year: string,
    poster: string,
}

interface MoviesState {
    movies: Movies,
    favorites: Favorites[],
    page: number,
    error: string,
}

const initialState: MoviesState = {
    movies: {},
    favorites: [],
    page: 1,
    error: '',
};

export const MoviesSlice = createSlice({
    name: 'Movies',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Movies>) => {
            state.movies = action.payload;
        },
        setFavorites: (state, action: PayloadAction<Favorites[]>) => {
            state.favorites = action.payload;
        },
        nextPage: (state) => {
            state.page += 1;
        },
        prevPage: (state) => {
            state.page -= 1;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    },
});

export const { set, setFavorites, prevPage, nextPage, setError } = MoviesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const sevMovies = (data: Movies): AppThunk => dispatch => {
    dispatch(set(data));
    dispatch(setError(''));
};

export const getFavorites = (): AppThunk => dispatch => {
    axios({
        method: "GET",
        url: "http://localhost:3001/movies/favorite",
        headers: auth.header,
    }).then(({ data }) => {
        dispatch(setFavorites(data.favorites));
    }).catch((err) => {
        console.log('err', err)
        dispatch(setFavorites([]))
    })
}

export const search = (value: string, page: number): AppThunk => dispatch => {
    axios({
        method: 'get',
        url: `http://localhost:3001/movies?s=${value}&page=${page}`,
    })
        .then(({ data }) => {
            if (data.Response === "True") {
                return dispatch(sevMovies(data))
            } else {
                return dispatch(setError(data.Error))
            }
        })
        .catch((err) => err.response)
}

export const removeFavorite = (imdbID: string): AppThunk => dispatch => {
    axios({
        method: "DELETE",
        url: "http://localhost:3001/movies/favorite",
        headers: auth.header,
        data: {
            imdbID
        }
    }).then(({ data }) => {
        dispatch(setFavorites(data.favorites));
    }).catch((err) => {
        console.log('err', err)
    })
}

export const addFavorite = (movie: Favorites): AppThunk => dispatch => {
    axios({
        method: "POST",
        url: "http://localhost:3001/movies/favorite",
        headers: auth.header,
        data: {
            ...movie
        }
    }).then(({ data }) => {
        if (!data.error)
            dispatch(setFavorites(data.favorites));
    }).catch((err) => {
        console.log('err', err)
    })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Movies.value)`
export const selectMovies = (state: RootState) => state.movies;

export default MoviesSlice.reducer;
