import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';

interface Movies {
    Search?: []
    totalResults?: number
    Response?: string
    Error?: string
}

interface MoviesState {
    movies: Movies
    page: number
}

const initialState: MoviesState = {
    movies: {},
    page: 1,
};

export const MoviesSlice = createSlice({
    name: 'Movies',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Movies>) => {
            state.movies = action.payload;
        },
        
        setPage: (state, action: PayloadAction<Movies>) => {
            console.log(state.movies)
            state.movies = { ...state.movies, ...action.payload };
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
});

export const { set, setPage } = MoviesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const sevMovies = (data: Movies): AppThunk => dispatch => {
    dispatch(set(data));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Movies.value)`
export const selectMovies = (state: RootState) => state.movies;

export default MoviesSlice.reducer;
