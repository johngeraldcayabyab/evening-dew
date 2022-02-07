import {Breadcrumb} from "antd";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";
import Title from "antd/lib/typography/Title";
import useFetchCatcher from "../Hooks/useFetchCatcher";
import useFetchHook from "../Hooks/useFetchHook";
import {GET} from "../consts";

const CustomBreadcrumb = () => {
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        let pathname = location.pathname;
        let newSlug = {};
        let splitPathName = pathname.split('/');

        let isCreatePagePath = splitPathName.length === 3 && splitPathName[2] === 'create';
        let isEditPagePath = splitPathName.length === 3 && splitPathName[2] !== 'create';
        let isMainPath = splitPathName.length === 2;

        if (isEditPagePath) {
            useFetch(`/api${splitPathName.join('/')}/slug`, GET).then((response) => {
                response.link = pathname;
                setBreadcrumbsState(isMainPath, response, pathname, splitPathName, isEditPagePath);
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        } else if (isCreatePagePath) {
            newSlug = {
                key: uuidv4(),
                slug: 'New',
                link: pathname
            };
            setBreadcrumbsState(isMainPath, newSlug, pathname, splitPathName, isEditPagePath);
        } else if (isMainPath) {
            newSlug = {
                key: uuidv4(),
                slug: titleCase(replaceUnderscoreWithSpace(splitPathName[1])),
                link: pathname
            };
            setBreadcrumbsState(isMainPath, newSlug, pathname, splitPathName, isEditPagePath);
        }
    }, [location.pathname]);

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);

    function setBreadcrumbsState(isMainPath, newSlug, pathname, splitPathName, isEditPagePath) {
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
    }

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

            {!breadcrumbs.length ? <Breadcrumb.Item><Title level={5} style={{
                display: 'inline-block',
                visibility: 'hidden'
            }}>placeholder for UX</Title></Breadcrumb.Item> : null}
        </Breadcrumb>
    )
};

export default CustomBreadcrumb;
