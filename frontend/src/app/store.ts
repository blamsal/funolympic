import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import streamReducer from '../features/streams/streamSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
	reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    stream: streamReducer,
    profile: profileReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(apiSlice.middleware),
  devTools: true
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

