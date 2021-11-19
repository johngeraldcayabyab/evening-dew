import {Breadcrumb} from "antd";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";
import Title from "antd/lib/typography/Title";

const CustomBreadcrumb = () => {
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

        setBreadcrumbs(() => {
            let breadcrumbs = [];
            if (localStorage.getItem("breadcrumbs")) {
                breadcrumbs = JSON.parse(localStorage.getItem("breadcrumbs"));
            }

            let breadcrumbsState = [...breadcrumbs];
            if (isMainPath) {
                breadcrumbsState = [];
            }

            /**
             *Cuts path back if path exists;
             */
            let isNewPathExists = breadcrumbs.findIndex(state => state.link === newSlug.link);
            if (Math.max(0, isNewPathExists)) {
                breadcrumbsState = breadcrumbsState.slice(0, isNewPathExists);
            }

            /**
             * Adds a parent breadcrumb if path is lonely on page refresh
             */
            if (breadcrumbsState.length === 0 && !isMainPath) {
                let newPathname = pathname.split('/');
                newPathname.pop();
                newPathname = newPathname.join('/');
                breadcrumbsState.push({
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
                breadcrumbsState = breadcrumbsState.filter((state) => {
                    if (state.slug !== 'New') {
                        return state;
                    }
                });
            }

            breadcrumbsState = breadcrumbsState.map((state) => {
                state.isLink = true;
                return state;
            });
            newSlug.isLink = false;

            breadcrumbsState.push(newSlug);

            localStorage.setItem("breadcrumbs", JSON.stringify(breadcrumbsState));
            return breadcrumbsState;
        });

    }, [location.pathname]);

    return (
        <Breadcrumb>
            {breadcrumbs.map((breadcrumb) => {
                if (breadcrumb.isLink) {
                    return (
                        <Breadcrumb.Item key={`breadcrumb-${breadcrumb.key}`}>
                            <Title level={5} style={{display: 'inline-block'}}>
                                <Link key={`link-${breadcrumb.key}`} to={breadcrumb.link}>
                                    {breadcrumb.slug}
                                </Link>
                            </Title>
                        </Breadcrumb.Item>
                    )
                } else {
                    return (
                        <Breadcrumb.Item key={`breadcrumb-${breadcrumb.key}`}>
                            <Title level={5} style={{display: 'inline-block'}}>{breadcrumb.slug}</Title>
                        </Breadcrumb.Item>
                    )
                }
            })}
        </Breadcrumb>
    )
};

export default CustomBreadcrumb;
