import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "@/utils/fetchData";
import createUrl from "@/utils/createUrl";


const initialState = {
    characters: {
        isLoading: null,
        error: null,
        data: [],
    },
}

export const fetchCharactersRedux = createAsyncThunk(
    "characters/fetchCharactersRedux",
    async (payload, {rejectWithValue}) => {
        try {
            const url = createUrl();
            const response = await fetchData(url);
            
            return response;
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCharactersRedux.pending]: (state) => {
            state.characters.isLoading = true;
            state.characters.error = null;
        },
        [fetchCharactersRedux.fulfilled]: (state, action) => {
            state.characters.isLoading = false;
            state.characters.data = action.payload;
        },
        [fetchCharactersRedux.rejected]: (state, action) => {
            state.characters.isLoading = false;
            state.characters.error = action.payload;
        }
    }
})

export const { setCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;