import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../app/store';
import auth from '../utils/auth';

interface Service {
    token?: string
    name?: string
    email?: string
    picture?: string
}

interface ServiceState {
    service: Service
}

interface ILogin {
    tokenId: string
}

const initialState: ServiceState = {
    service: {
        token: '',
        name: '',
        email: '',
        picture: '',
    },
};

export const ServiceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<Service>) => {
            state.service = action.payload;
        },

        clear: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPicture');
            state.service = {
                token: '',
                name: '',
                email: '',
                picture: '',
            }
        }
    },
});

export const { addUser, clear } = ServiceSlice.actions;

export const login = (tokenId: ILogin): AppThunk => dispatch => {
    console.log('redux', tokenId)
    axios({
        method: "POST",
        url: "http://localhost:3001/user/auth/",
        data: {
            token: tokenId
        },
    }).then(({ data }) => {
        console.log('redux', data)
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userPicture', data.picture);
        dispatch(addUser(
            {
                token: data.token,
                name: data.name,
                email: data.email,
                picture: data.picture,
            }
        ))
    }).catch((err) => {
        dispatch(clear());
    })
}

export const heckLogin = (): AppThunk => dispatch => {
    axios({
        method: "GET",
        url: "http://localhost:3001/user/heckLogin",
        headers: auth.header,
    }).then(({ data }) => {
        console.log('redux', data)
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userPicture', data.picture);
        dispatch(addUser(
            {
                token: data.token,
                name: data.name,
                email: data.email,
                picture: data.picture,
            }
        ))
    }).catch((err) => {
        console.log('err', err)
    })
}



export const selectUser = (state: RootState) => state.service;

export default ServiceSlice.reducer;
