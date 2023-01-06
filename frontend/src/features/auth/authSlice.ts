import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { parseJwt } from '../../utils/parseJWT';

interface AuthState {
    name: string;
    email: string;
    userId: string;
    access: string;
    refresh: string;
}

const initialState = { name: "",email: "", access: "", refresh: "", userId: "" };

const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>, "auth">({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            const { access, refresh } = action.payload;
            // state.user = user;
            state.access = access;
            state.refresh = refresh;
            const parsed = parseJwt(access);
            // console.log(parsed);
            state.name = parsed.name;
            state.email = parsed.email;
            state.userId = parsed.user_id;
        },
        
        logout: (state, payload) => {
            state.access = "";
            state.email = "";
            state.name = "";
            state.refresh = "";
            state.userId = "";
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;


const persistConfig = {
    key: "auth",
    storage
};


const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export default persistedReducer;

export const selectCurrentUserId = (state: RootState) => state.auth.userId;
export const selectCurrentToken = (state: RootState) => state.auth.access;

