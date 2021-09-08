import {Breadcrumb} from "antd";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {replaceUnderscoreWithSpace, uuidv4} from "../Helpers/string";

const DynamicBreadcrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(async () => {
        let pathname = location.pathname;
        let newSlug = {};
        let slugUrl = pathname.split('/');
        if (slugUrl.length === 3 && slugUrl[2] !== 'create') {
            slugUrl = '/api' + slugUrl.join('/') + '/slug';
            let responseData = await fetch(slugUrl)
                .then(response => response.json())
                .then(data => (data));
            responseData.link = pathname;
            newSlug = responseData;
        } else if (slugUrl.length === 3 && slugUrl[2] === 'create') {
            newSlug = {
                key: uuidv4(),
                slug: 'New',
                link: pathname
            };
        } else if (slugUrl.length === 2) {
            newSlug = {
                key: uuidv4(),
                slug: replaceUnderscoreWithSpace(slugUrl[1], true),
                link: pathname
            };
        }

        setBreadcrumbs(previousState => {
            let newState = [
                ...previousState
            ];
            newState = newState.map((state) => {
                state.isLink = true;
                return state;
            });
            newSlug.isLink = false;
            newState.push(newSlug);
            return newState;
        });

    }, [location.pathname]);


    return (
        <Breadcrumb style={{margin: '16px 0'}}>
            {breadcrumbs.map((breadcrumb) => {
                if (breadcrumb.isLink) {
                    return (
                        <Breadcrumb.Item key={`breadcrumb-${breadcrumb.key}`}>
                            <Link key={`link-${breadcrumb.key}`} to={breadcrumb.link}>
                                {breadcrumb.slug}
                            </Link>
                        </Breadcrumb.Item>
                    )
                } else {
                    return (
                        <Breadcrumb.Item key={`breadcrumb-${breadcrumb.key}`}>
                            {breadcrumb.slug}
                        </Breadcrumb.Item>
                    )
                }
            })}
        </Breadcrumb>
    )
};

export default DynamicBreadcrumbs;
