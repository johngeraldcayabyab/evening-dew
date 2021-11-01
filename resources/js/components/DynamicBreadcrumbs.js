import {Breadcrumb} from "antd";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";

const DynamicBreadcrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([])


    const isCreatePagePath = (splitPathName) => {
        return splitPathName.length === 3 && splitPathName[2] === 'create';
    }

    const isEditPagePath = (splitPathName) => {
        return splitPathName.length === 3 && splitPathName[2] !== 'create';
    }

    const isMainPath = (splitPathName) => {
        return splitPathName.length === 2;
    }


    useEffect(async () => {
        let pathname = location.pathname;
        let newSlug = {};
        let splitPathName = pathname.split('/');
        let pathRefresh = false;
        if (isEditPagePath(splitPathName)) {
            splitPathName = '/api' + splitPathName.join('/') + '/slug';
            let responseData = await fetch(splitPathName)
                .then(response => response.json())
                .then(data => (data));
            responseData.link = pathname;
            newSlug = responseData;
        } else if (isCreatePagePath(splitPathName)) {
            newSlug = {
                key: uuidv4(),
                slug: 'New',
                link: pathname
            };
        } else if (isMainPath) {
            newSlug = {
                key: uuidv4(),
                slug: titleCase(replaceUnderscoreWithSpace(splitPathName[1])),
                link: pathname
            };
            pathRefresh = true;
        }

        setBreadcrumbs(previousState => {
            let newState = [...previousState];
            if (pathRefresh) {
                newState = [];
            }

            /**
             *Cuts path back if path exists;
             */
            let isNewPathIndexExists = previousState.findIndex(state => state.link === newSlug.link);
            if (Math.max(0, isNewPathIndexExists)) {
                newState = newState.slice(0, isNewPathIndexExists);
            }

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
