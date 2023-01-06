import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { VideoStreamSchema } from './streamApiSlice';

export interface Stream {
	id: string;
	title: string;
	description: string | undefined;
	streamKey: string;
	startTime: number;
	thumbnail: string;
	// venue: string;
	created: number;
}
interface StreamState {
	streams: Stream[];
}

const initialState: StreamState = {
	streams: [],
};

const streamSlice = createSlice<StreamState, SliceCaseReducers<StreamState>, "stream">({
	name: "stream",
	initialState,
	reducers: {
		setStreams: (state, action: PayloadAction<VideoStreamSchema[]>) => {
			state.streams = action.payload.map(({ id, title, description, start_time, created, stream_key, thumbnail }) => {
				return {
					id,
					title,
					description,
					startTime: Date.parse(start_time),
					created: Date.parse(created),
					streamKey: stream_key,
					thumbnail: thumbnail ? thumbnail : "https://dummyimage.com/720x600/ababab/ffffff&text=Stream",
				};
			});
		},
	},
});

export const { setStreams } = streamSlice.actions;

export default streamSlice.reducer;

export const selectStream = (state: RootState) => state.stream;
