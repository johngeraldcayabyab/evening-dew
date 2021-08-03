import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [state, setState] = useState([]);

    useEffect(async () => {
        let responseData = await fetch(url)
            .then(response => response.json())
            .then(data => (data));
        setState(responseData);
    }, []);

    return [state, setState]
};

export default useFetch;
