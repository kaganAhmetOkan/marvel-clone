const request = async (props) => {
    const { url, options } = props;
    const req = await fetch(url, options);
    const data = await req.json();
    
    return data?.data?.results;
}

export default request;