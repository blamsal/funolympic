import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

interface ProfileState {
    id: string;
    email: string;
    name: string;
}

const profileSlice = createSlice<ProfileState, SliceCaseReducers<ProfileState>, "profile">({
    name: "profile",
    initialState: { id: "", email: "", name: ""},
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileState>) => {
            const { id, email, name } = action.payload;
            state.id = id;
            state.email = email;
            state.name = name;
        },
    }
})

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;

export const selectProfile = (state: RootState) => state.profile;