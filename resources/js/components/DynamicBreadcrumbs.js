import {Breadcrumb} from "antd";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const DynamicBreadcrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(async () => {
        let slugUrl = location.pathname.split('/');
        if (slugUrl.length === 3 && slugUrl[2] !== 'create') {
            slugUrl = '/api' + slugUrl.join('/') + '/slug';
            let responseData = await fetch(slugUrl)
                .then(response => response.json())
                .then(data => (data));

            responseData.link = location.pathname;

            setBreadcrumbs((previousState) => ([
                ...previousState,
                responseData
            ]));

        }

    }, [location.pathname]);

    function generateSlug() {

    }

    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            {breadcrumbs.map((breadcrumb) => {
                return (
                    <Breadcrumb.Item key={breadcrumb.key}>
                        <Link to={breadcrumb.link}>
                            {breadcrumb.slug}
                        </Link>
                    </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
};

export default DynamicBreadcrumbs;
