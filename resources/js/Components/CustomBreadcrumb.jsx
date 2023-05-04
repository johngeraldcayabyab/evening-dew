import {Breadcrumb} from "antd";
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getBreadcrumbs, getClickedBreadcrumb, setBreadcrumbs, setClickedBreadcrumb} from "../Helpers/breadcrumbs";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";
import {objectHasValue} from "../Helpers/object";
import {FormContext} from "../Contexts/FormContext";
import {TableContext} from "../Contexts/TableContext";

const CustomBreadcrumb = () => {
    const location = useLocation();
    const formContext = useContext(FormContext);
    const tableContext = useContext(TableContext);
    const [state, setState] = useState({
        breadcrumbs: [],
    });

    useEffect(() => {
        let breadcrumbs = getBreadcrumbs();
        let breadcrumb = {
            key: null,
            link: null,
            slug: null,
        };
        if (formContext.hasOwnProperty('formState') && !formContext.formState.initialLoad) {
            if (formContext.state.id) {
                breadcrumb.slug = formContext.formState.initialValues.slug;
            } else {
                breadcrumb.slug = 'New';
            }
        }
        if (tableContext.hasOwnProperty('state')) {
            breadcrumb.slug = titleCase(replaceUnderscoreWithSpace(tableContext.manifest.displayName));
        }
        if (breadcrumb.slug) {
            setBreadcrumbsAndState(breadcrumbs, breadcrumb);
        }
    }, [tableContext.tableState, formContext.formState]);

    function setBreadcrumbsAndState(breadcrumbs, newBreadcrumb) {
        let pathname = location.pathname;
        let splitPathName = pathname.split('/');
        let isMainPath = splitPathName.length === 2;
        const [lastBreadcrumb] = breadcrumbs.slice(-1);
        newBreadcrumb.key = uuidv4();
        newBreadcrumb.link = location.pathname + location.search;
        breadcrumbs = [
            ...breadcrumbs,
            newBreadcrumb
        ];

        /**
         * This avoids duplicate last breadcrumbs
         */
        if (lastBreadcrumb && lastBreadcrumb.link === newBreadcrumb.link) {
            breadcrumbs.pop();
        }

        /**
         * Removes 'New' if redirected to the new resource
         */
        if (newBreadcrumb.slug !== 'New') {
            breadcrumbs = breadcrumbs.filter((breadcrumb) => (breadcrumb.slug !== 'New' && breadcrumb));
        }

        /**
         * Adds a parent breadcrumb if path is lonely on page refresh
         */
        if (breadcrumbs.length === 1 && !isMainPath) {
            let newPathname = location.pathname.split('/');
            newPathname.pop();
            newPathname = newPathname.join('/');
            breadcrumbs = [{
                key: uuidv4(),
                slug: titleCase(replaceUnderscoreWithSpace(splitPathName[1])),
                link: newPathname
            }].concat(breadcrumbs);
        }

        /**
         *Cuts path back if path exists;
         */
        if (objectHasValue(getClickedBreadcrumb())) {
            let isClickedBreadcrumb = breadcrumbs.findIndex(breadcrumb => breadcrumb.key === getClickedBreadcrumb().key);
            isClickedBreadcrumb += 1;
            breadcrumbs = breadcrumbs.slice(0, isClickedBreadcrumb);
            setClickedBreadcrumb({});
        }

        setBreadcrumbs(breadcrumbs);
        setState((prevState) => ({
            ...prevState,
            breadcrumbs: breadcrumbs
        }));
    }

    // function itemRender(route, params, items, paths) {
    //     return <Link to={route.link}>{route.title}</Link>;
    // }

    const items = state.breadcrumbs.map((breadcrumb) => ({
        key: uuidv4(),
        // link: breadcrumb.link,
        title: <Link to={breadcrumb.link} reloadDocument={true}>{breadcrumb.slug}</Link>,
        onClick: () => {
            setClickedBreadcrumb(breadcrumb);
        },
    }));

    return <Breadcrumb items={items}/>
};

export default CustomBreadcrumb;
