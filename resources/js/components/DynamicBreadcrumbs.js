import {Breadcrumb} from "antd";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";

const DynamicBreadcrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(async () => {
        let pathname = location.pathname;
        let newSlug = {};
        let splitPathName = pathname.split('/');

        let isCreatePagePath = splitPathName.length === 3 && splitPathName[2] === 'create';
        let isEditPagePath = splitPathName.length === 3 && splitPathName[2] !== 'create';
        let isMainPath = splitPathName.length === 2;

        if (isEditPagePath) {
            let responseData = await fetch(`/api${splitPathName.join('/')}/slug`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => (data));
            responseData.link = pathname;
            newSlug = responseData;
        } else if (isCreatePagePath) {
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
        }

        setBreadcrumbs(previousState => {
            let newState = [...previousState];
            if (isMainPath) {
                newState = [];
            }

            /**
             *Cuts path back if path exists;
             */
            let isNewPathExists = previousState.findIndex(state => state.link === newSlug.link);
            if (Math.max(0, isNewPathExists)) {
                newState = newState.slice(0, isNewPathExists);
            }

            /**
             * Adds a parent breadcrumb if path is lonely
             */
            if (newState.length === 0 && !isMainPath) {
                let newPathname = pathname.split('/');
                newPathname.pop();
                newPathname = newPathname.join('/');
                newState.push({
                    key: uuidv4(),
                    slug: titleCase(replaceUnderscoreWithSpace(splitPathName[1])),
                    link: newPathname
                });
            }

            /**
             * Remove "Create Pages" if page has been redirected to
             * the created page
             */
            if (isEditPagePath) {
                newState = newState.filter((state) => {
                    if (state.slug !== 'New') {
                        return state;
                    }
                });
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
