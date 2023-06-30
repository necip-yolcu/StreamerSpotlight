import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StreamerServices from "../services/StreamerServices";

const fetchStreams = createAsyncThunk('streams/fetchStreams', async () => {
    try {
        const response = await StreamerServices.getAllStreamers();
        return response;
    } catch (error) {
        throw Error('Failed to fetch streams', error.message)
    }
})

const postStream = createAsyncThunk('stream/postStream', async (streamData) => {
    try {
        const response = await StreamerServices.addStreamer(streamData);
        return response;
    } catch (error) {
        throw new Error('Failed to post stream: ' + error.message);
    }
})

const updateVoteStream = createAsyncThunk('stream/updateVoteStream', async ({streamerId, vote}) => {
    try {
        const response = await StreamerServices.updateVoteByID(streamerId, { "action": vote })
        return response;
    } catch (error) {
        throw new Error('Failed to update upvote: ' + error.message);
    }
})

const streamSlice = createSlice({
    name: "stream",
    initialState: {
        streamList: [],
        loading: false,
        error: null
    },
    reducers: { //synchronous actions
    },
    extraReducers: (builder) => {   //async thunk
        //fetchStream
        builder.addCase(fetchStreams.pending, state => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchStreams.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.streamList = action.payload
        })
        builder.addCase(fetchStreams.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        //postStream
        builder.addCase(postStream.pending, state => {
            state.loading = true
            state.error = null
        })
        builder.addCase(postStream.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.streamList.push(action.payload)
        })
        builder.addCase(postStream.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        //updateStream
        builder.addCase(updateVoteStream.pending, state => {
            state.loading = true
            state.error = null
        })
        builder.addCase(updateVoteStream.fulfilled, (state, action) => {
            state.loading = false
            state.error = null

            //state not update here
            /* const willUpdate = state.streamList?.find(stream => stream.id === action.payload.id)
            willUpdate.upvote = action.payload.upvote
            willUpdate.downvote = action.payload.downvote */

            const streamIndex = state.streamList?.findIndex(stream => stream.id === action.payload.id);
            if (streamIndex !== -1) {
                state.streamList[streamIndex].upvote = action.payload.upvote;
                state.streamList[streamIndex].downvote = action.payload.downvote;
            }
        })
        builder.addCase(updateVoteStream.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default streamSlice.reducer
export { fetchStreams, postStream, updateVoteStream } 