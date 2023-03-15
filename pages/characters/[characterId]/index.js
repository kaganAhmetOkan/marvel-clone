import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { fetchCharacter, fetchMarvel } from "../../api/characters";
import s from "@/styles/characterPage.module.scss";
import Head from "next/head";
import Comics from "@/components/Comics/Comics";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";


export default function CharacterDetail() {
    const router = useRouter();
    const [characterData, setCharacterData] = useState([]);
    const [characterComics, setCharacterComics] = useState([]);
    const { characterId } = router.query;
    const imageUrl = characterData[0]?.thumbnail.path.replace("http", "https");

    let offset = useRef(0);

    useEffect(() => {
        async function getData() {
            const data = await fetchCharacter(characterId);
            if (data !== undefined) {
                setCharacterData(data);
            }

            const comic = await fetchMarvel("comics", characterId);
            if (comic !== undefined) {
                setCharacterComics(comic);
            }
        }
        getData();
    }, [characterId]);

    const loadMore = useCallback(async () => {
        offset.current++;
        const comic = await fetchMarvel("comics", characterId, offset.current * 20);
        if (comic !== undefined) {
            setCharacterComics(currentComicData => [
                ...currentComicData,
                ...comic
            ]);
        }

    })

    return (
        <div className={s.root}>
            <Head>
                <title>{`Marvel Characters | ${characterData[0]?.name ? characterData[0]?.name : "Unknown Character"}`}</title>
                <meta
                    name="description"
                    content={characterData[0]?.name ? "Unknown character, try searching for someone else?" : `Read all about ${characterData[0]?.name}, their stories, their comics and more!`} />
            </Head>
            <div className={s.container}>
                <div className={s.return} onClick={() => router.push("/")}>
                    <div className={s.returnTop}></div>
                    <div className={s.returnBottom}></div>
                </div>
                <div className={s.main}>
                    <div className={s.characterBox}>
                        <div className={s.title}>
                            {characterData[0]?.name}
                        </div>
                        <div className={s.overflowHidden}>
                            <img className={s.img} src={imageUrl + "/portrait_xlarge." + characterData[0]?.thumbnail.extension} />
                        </div>
                        <div className={s.paragraph}>
                            {characterData[0]?.description == "" ? `${characterData[0]?.name} does not have a description...` : characterData[0]?.description}
                        </div>
                    </div>
                </div>
                <div className={s.comicsContainer}>
                    <h1 className={s.comicsTitle}>Comics</h1>
                    <InfiniteScroll
                        dataLength={characterComics?.length ?? 0}
                        next={loadMore}
                        hasMore={true}
                        loader={true ? <div></div> :
                            <Skeleton
                                style={{
                                        display: "flex",
                                        width: "200px",
                                        height: "400px",
                                        borderRadius: "12px"
                                    }}
                                />
                        }>
                        <Comics comics={characterComics} />
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}