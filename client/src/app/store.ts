import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from '.././slice/moviesSlice';
import serviceReducer from '../slice/serviceSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    service: serviceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
