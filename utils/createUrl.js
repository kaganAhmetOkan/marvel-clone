import md5 from "md5";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const createUrl = ({nameStartsWith, offset, id, type}) => {
    const url = new URL(baseUrl);
    const timeStampt = Date.now();
    const hash = md5(timeStampt + privateKey + publicKey);

    url.searchParams.set("apikey", publicKey);
    url.searchParams.set("ts", timeStampt);
    url.searchParams.set("hash", hash);
    
    if (id) url.pathname += `/${id}`;
    if (type) url.pathname += `/${type}`;

    if (nameStartsWith) url.searchParams.set("nameStartsWith", nameStartsWith);
    if (offset) url.searchParams.set("offset", offset);
    url.searchParams.set("limit", 100);

    return url;
}

export default createUrl;
