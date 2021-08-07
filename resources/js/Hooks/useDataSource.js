import {useEffect, useState} from "react";

const useDataSource = (url) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(async () => {
        let responseData = await fetch(url)
            .then(response => response.json())
            .then(data => (data));
        setDataSource(responseData);
    }, []);

    return [dataSource, setDataSource]
};

export default useDataSource;
