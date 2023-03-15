import createUrl from "@/utils/createUrl";
import fetchData from "@/utils/fetchData";


export async function fetchCharacters(nameStartsWith, offset) {
    const url = createUrl({nameStartsWith:nameStartsWith, offset:offset});
    return fetchData(url);
}

export async function fetchCharacter(id) {
    if (id !== undefined) {
        const url = createUrl({id:id});
        return fetchData(url);
    }
}

export async function fetchMarvel(type, id, offset) {
    if (id) {
        const url = createUrl({id:id, type:type, offset:offset});
        return fetchData(url);
    }

    if (type) {
        const url = createUrl({type:type});
        return fetchData(url);
    }
}