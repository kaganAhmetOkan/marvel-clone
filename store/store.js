import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () => 
    configureStore({
        reducer: reducers,
    });


export const wrapper = createWrapper(makeStore);