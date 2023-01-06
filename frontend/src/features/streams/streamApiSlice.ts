import { apiSlice } from '../../app/api/apiSlice';

export interface VideoStreamSchema {
    id: string;
    title: string;
    description: string;
    stream_key: string;
    start_time: string;
    thumbnail: string;
    created: string;
}

export const streamApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllStreams: builder.query<VideoStreamSchema[], {}>({
            query: () => ({
                url: "/api/video-streams/",
                method: "GET",
            })
        })
    })
})

export const { useGetAllStreamsQuery } = streamApiSlice;