import { fetchSeries } from "../../../api/characters";
import { useRouter } from "next/router";
import React, { useEffect, useState} from "react";

export default function CharacterSeries() {
    const router = useRouter();
    const [seriesData, setSeriesData] = useState([]);
    const {characterId} = router.query;

    useEffect(() => {
        async function getData() {
            const data = await fetchSeries(characterId);
            setSeriesData(data);
        }
        getData();
    }, [fetchSeries]);
    return(
        <div>
            Series
        </div>
    )
}