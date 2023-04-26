import {Breadcrumb} from "antd";
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Title from "antd/lib/typography/Title";
import {getBreadcrumbs, getClickedBreadcrumb, setBreadcrumbs, setClickedBreadcrumb} from "../Helpers/breadcrumbs";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";
import {objectHasValue} from "../Helpers/object";
import {FormContext} from "../Contexts/FormContext";
import {TableContext} from "../Contexts/TableContext";

const CustomBreadcrumb = () => {
    const location = useLocation();
    const formContext = useContext(FormContext);
    const listContext = useContext(TableContext);
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
            if (formContext.formState.id) {
                breadcrumb.slug = formContext.formState.initialValues.slug;
            } else {
                breadcrumb.slug = 'New';
            }
        }
        if (listContext.hasOwnProperty('tableState') && !listContext.tableState.initialLoad) {
            breadcrumb.slug = titleCase(replaceUnderscoreWithSpace(listContext.tableState.moduleName));
        }
        if (breadcrumb.slug) {
            setBreadcrumbsAndState(breadcrumbs, breadcrumb);
        }
    }, [listContext.tableState, formContext.formState]);

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

    // <Title level={5} style={{display: 'inline-block'}}>
    //     <Link key={breadcrumb.key} to={breadcrumb.link} onClick={() => {
    //         setClickedBreadcrumb(breadcrumb);
    //     }}>
    //         {breadcrumb.slug}
    //     </Link>
    // </Title>

    function itemRender(route, params, items, paths) {
        // return <Title level={5} style={{display: 'inline-block'}}>{item.title}</Title>
        // const last = items.indexOf(item) === items.length - 1;
        // return last ? <Title level={5} style={{display: 'inline-block'}}>{item.title}</Title> :
        //     <Title level={5} style={{display: 'inline-block'}}><Link to={paths.join('/')}>{item.title}</Link></Title>;
    }

    const items = state.breadcrumbs.map((breadcrumb) => {
        return {
            href: breadcrumb.link,
            title: breadcrumb.slug,
            onClick: () => {
                setClickedBreadcrumb(breadcrumb);
            },
        }
    });

    return <Breadcrumb items={items}/>
};

export default CustomBreadcrumb;
