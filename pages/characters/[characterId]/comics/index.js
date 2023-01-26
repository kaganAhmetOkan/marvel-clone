import { fetchMarvel } from "../../../api/characters";
import { useRouter } from "next/router";
import React, { useEffect, useState} from "react";

export default function CharacterComics() {
    const router = useRouter();
    const [comicData, setComicData] = useState([]);
    const characterId = router.query.characterId;

    useEffect(() => {
        async function getData() {
            const data = await fetchMarvel("comics" ,characterId);
            setComicData(data);
        }
        getData();
    }, [fetchMarvel, router]);

    return(
        <div>
            Comics
        </div>
    )
}