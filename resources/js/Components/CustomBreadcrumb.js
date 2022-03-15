import {Breadcrumb} from "antd";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import {getBreadcrumbs, getClickedBreadcrumb, setBreadcrumbs, setClickedBreadcrumb} from "../Helpers/breadcrumbs";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";
import {objectHasValue} from "../Helpers/object";

const CustomBreadcrumb = (props) => {
    const location = useLocation();
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
        if (props.hasOwnProperty('formState') && !props.formState.initialLoad) {
            if (props.formState.id) {
                breadcrumb.slug = props.formState.initialValues.slug;
            } else {
                breadcrumb.slug = 'New';
            }
        }
        if (props.hasOwnProperty('tableState') && !props.tableState.initialLoad) {
            breadcrumb.slug = titleCase(replaceUnderscoreWithSpace(props.tableState.moduleName));
        }
        if (breadcrumb.slug) {
            setBreadcrumbsAndState(breadcrumbs, breadcrumb);
        }
    }, [props.tableState, props.formState]);

    function setBreadcrumbsAndState(breadcrumbs, newBreadcrumb) {
        let pathname = location.pathname;
        let splitPathName = pathname.split('/');
        let isMainPath = splitPathName.length === 2;

        const [lastBreadcrumb] = breadcrumbs.slice(-1);
        newBreadcrumb.key = uuidv4();
        newBreadcrumb.link = location.pathname;
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
            // if (Math.max(0, isClickedBreadcrumb)) {
            //     console.log(isClickedBreadcrumb);
            // console.log();
            isClickedBreadcrumb += 1;
            breadcrumbs = breadcrumbs.slice(0, isClickedBreadcrumb);
            console.log(breadcrumbs, isClickedBreadcrumb);
            setClickedBreadcrumb({});
            // }
        }

        setBreadcrumbs(breadcrumbs);
        setState((prevState) => ({
            ...prevState,
            breadcrumbs: breadcrumbs
        }));
    }

    return (
        <Breadcrumb>
            {state.breadcrumbs.map((breadcrumb) => {
                return (
                    <Breadcrumb.Item key={breadcrumb.key}>
                        <Title level={5} style={{display: 'inline-block'}}>
                            <Link key={breadcrumb.key} to={breadcrumb.link} onClick={() => {
                                setClickedBreadcrumb(breadcrumb);
                            }}>
                                {breadcrumb.slug}
                            </Link>
                        </Title>
                    </Breadcrumb.Item>
                )
            })}
            {!state.breadcrumbs.length ? <Breadcrumb.Item><Title level={5} style={{
                display: 'inline-block',
                visibility: 'hidden'
            }}>placeholder for UX</Title></Breadcrumb.Item> : null}
        </Breadcrumb>
    )
};

export default CustomBreadcrumb;