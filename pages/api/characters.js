import md5 from "md5";

const baseUrl = "https://gateway.marvel.com/v1/public/characters";
const ts = Date.now();
const hash = md5(ts + '56b5b68d3a5212a3b26109ed8e3e8fe0ec4ca299' + 'a6f93cc5c5093386f25d9918234ba282');

export async function fetchCharacters(givenName, offset) {

    let url = `${baseUrl}?limit=48&ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
    if (givenName) {
        url = `${baseUrl}?limit=48&nameStartsWith=${givenName}&ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
    }
    if (!givenName && offset) {
        url = `${baseUrl}?offset=${offset}&limit=48&ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    console.log("fetching success: ", data?.data?.results);
    return data?.data?.results;
}

/* Used for debugging
export async function fetchById(id) {
    const url = `${baseUrl}/${id}?ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
    const res = await fetch(url);
    const data = await res.json();
    return data?.data?.results;
}
*/

export async function fetchCharacter(id) {
    if (id !== undefined) {
        const url = `${baseUrl}/${id}?ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
        const res = await fetch(url);
        const data = await res.json();
        return data?.data?.results;
    }
    return;
}

export async function fetchMarvel(type, id) {
    if (id) {
        const url = `${baseUrl}/${id}/${type}?ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
        const res = await fetch(url);
        const data = await res.json();
        return data?.data?.results;
    }

    if (type) {
        const url = `https://gateway.marvel.com/v1/public/${type}?ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
        const res = await fetch(url);
        const data = await res.json();
        return data?.data?.results;
    }
    return;
}

/* DEPRECATED

export async function fetchComics(id) {
    const url = `${baseUrl}/${id}/comics?ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
    const res = await fetch(url);
    const data = await res.json();

    return data?.data?.results;
}

export async function fetchSeries(id) {
    const url = `${baseUrl}/${id}/series?ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
    const res = await fetch(url);
    const data = await res.json();

    return data?.data?.results;
}

export async function fetchStories(id) {
    const url = `${baseUrl}/${id}/stories?ts=${ts}&apikey=a6f93cc5c5093386f25d9918234ba282&hash=${hash}`;
    const res = await fetch(url);
    const data = await res.json();

    return data?.data?.results;
}
*/
