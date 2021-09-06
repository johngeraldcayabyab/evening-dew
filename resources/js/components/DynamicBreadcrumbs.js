import {Breadcrumb} from "antd";
import {useLocation} from "react-router";
import {useEffect} from "react";

const DynamicBreadcrumbs = () => {

    const location = useLocation();

    useEffect(async () => {
        let slugUrl = location.pathname.split('/');

        if (slugUrl.length === 3 && slugUrl[2] !== 'create') {
            slugUrl = '/api' + slugUrl.join('/') + '/slug';
            let responseData = await fetch(slugUrl)
                .then(response => response.json())
                .then(data => (data));
            console.log(responseData);
        }



    }, [location.pathname]);

    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    )
};

export default DynamicBreadcrumbs;
