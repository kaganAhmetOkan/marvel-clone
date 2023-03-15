import { combineReducers } from "@reduxjs/toolkit";
import charactersSlice from "./slices/charactersSlice";

const combinedReducer = combineReducers({
    characters: charactersSlice,
});

const reducers = (state, action) => combinedReducer(state, action);

export default reducers;