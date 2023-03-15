async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();

    return data?.data?.results;
}

export default fetchData;