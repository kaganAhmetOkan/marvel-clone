import { fetchStories } from "../../../api/characters";
import { useRouter } from "next/router";
import React, { useEffect, useState} from "react";

export default function CharacterStories() {
    const router = useRouter();
    const [StoryData, setStoryData] = useState([]);
    const {characterId} = router.query;

    useEffect(() => {
        async function getData() {
            const data = await fetchStories(characterId);
            setStoryData(data);
        }
        getData();
    }, [fetchStories]);
    return(
        <div>
            Stories
        </div>
    )
}