import React, {useCallback, useEffect, useState} from "react";
import s from "./Comics.module.scss";
import {fetchMarvel} from "../api/characters.js";
import Header from "../../components/Header/Header.js";

function Comics() {
    const [fetchData, setFetchData] = useState([]);
    const getData = useCallback(
        async (data) => {
            if (data) {
                const result = await fetchMarvel("comics");
                setFetchData(result);
                return;
            }
            return;
        }
    )

    useEffect(() => {
        getData();
    }, []);

    console.log(fetchData);

    return(
        <div className={s.root}>
            <Header />
            <h1>Comics</h1>
        </div>
    )
}

export default Comics;