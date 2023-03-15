import React, { useCallback, useEffect, useState, useRef } from "react";
import s from "../styles/Home.module.css";
import Characters from "../components/Characters/Characters.js";
import Header from "../components/Header/Header.js";
import { fetchCharacters } from "./api/characters";
import 'react-loading-skeleton/dist/skeleton.css'
import Head from "next/head";
import favicon from "@/public/favicon.png";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import Iterator from "@/components/Iterator/Iterator";
import { pushLocalStorage, pullLocalStorage } from "@/utils/localStoragePullAndPush";


export default function Home() {
    const [characterData, setCharacterData] = useState([]);
    const [searched, setSearched] = useState(false);
    let offset = useRef(0);

    const getData = useCallback(
        async (data, offset) => {
            if (offset) {
                const result = await fetchCharacters("", offset);

                setCharacterData(currentcharacterData => [
                    ...currentcharacterData,
                    ...result
                ]);
                return;
            }

            setCharacterData({});
            if (data) {
                const result = await fetchCharacters(data);
                setCharacterData(result);
                return;
            }
            
            const result = await fetchCharacters();
            setCharacterData(result);

        }, [setCharacterData]);

    const loadMore = useCallback(() => {
        if (!searched) {
            offset.current++;
            getData("", offset.current * 48);
        }
    }, [getData, offset, searched])

    useEffect(() => {
        const localData = pullLocalStorage("characters");
        const localOffset = pullLocalStorage("offset");
        
        if (localData?.length > 0) {
            setCharacterData(pullLocalStorage("characters"));
            offset.current = localOffset;
            setSearched(pullLocalStorage("searched"));
        }
        else {
            getData();
        };
    }, []);

    // update local storage whenever characterData is updated
    useEffect(() => {
        if (characterData?.length !== 0) {
            pushLocalStorage("characters", characterData);
        };
    }, [setCharacterData, characterData]);

    useEffect(() => {
        if (offset.current !== 0) {
            pushLocalStorage("offset", offset.current);
        };
    }, [offset, offset.current]);

    const getCharacters = useCallback((data) => {
        getData(data);
        if (data === "") {
            offset.current = 0;
            setSearched(false);
            pushLocalStorage("searched", false);
        }
        else {
            setSearched(true);
            pushLocalStorage("searched", true);
        }
    }, [getData]);

    return (
        <>
            <Head>
                <title>Marvel Characters | Search for Marvel Heroes!</title>
                <meta
                    name="description"
                    content="Okan's Catalog of Marvel Characters and Heroes. Read about all of Marvel Characters, their stories and comics here!"
                />
                <link rel="icon" type="image/x-icon" href={favicon.src} />
            </Head>
            <Header callback={getCharacters} />
            <InfiniteScroll
                dataLength={characterData?.length}
                next={loadMore}
                hasMore={true}
                loader={searched ? <div></div> :
                    <div className={s.charactersContainer}>{
                        <Iterator
                            amount={8}
                            element={<Skeleton className={s.skeletonRoot} style={{ borderRadius: "16px", animation: "none", opacity: 100 }} amount={24} />}
                        />
                    }</div>
                }
                endMessage={<h1>Oh wow, you scrolled all the way to the end!</h1>}
            ><Characters characterData={characterData} callback={loadMore} />
            </InfiniteScroll>
        </>
    )
}

// TODOS
// react-redux STORAGE

// STUDY
// DOM
// pagination
// CRUD

// Twitter with nodejs