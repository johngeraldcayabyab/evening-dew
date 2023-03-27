import React, {useContext, useEffect, useState} from "react";
import {Header} from "antd/lib/layout/layout";
import {Menu, message, Spin} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import useFetchHook from "../Hooks/useFetchHook";
import {POST} from "../consts";
import {useHistory, useLocation} from "react-router";
import {setBreadcrumbs, setClickedBreadcrumb} from "../Helpers/breadcrumbs";
import {replaceUnderscoreWithSpace, titleCase, uuidv4} from "../Helpers/string";
import AvatarUser from "./AvatarUser";
import {reset} from "../Helpers/reset";
import {objectHasValue} from "../Helpers/object"
import {AppContext} from "../Contexts/AppContext"

function resetBreadcrumbs(url) {
    let splitPathName = url.split('/');
    setClickedBreadcrumb({});
    setBreadcrumbs([{
        key: uuidv4(),
        slug: titleCase(replaceUnderscoreWithSpace(splitPathName[1])),
        link: url
    }]);
}

const CustomMenu = () => {
    const location = useLocation();
    const appContext = useContext(AppContext);
    const appState = appContext.appState;
    const useFetch = useFetchHook();
    const [state, setState] = useState({
        loading: true,
        appMenu: [],
        appMenuChildren: [],
    });
    const history = useHistory();

    function getRootIndex(appMenu = [], value) {
        value = '/' + value.split('/')[1];
        const appMenuLength = appMenu.length;
        for (let i = 0; i < appMenuLength; i++) {
            if (appMenu[i].hasOwnProperty('children')) {
                const isFound = recursion(appMenu[i].children, value);
                if (isFound) {
                    return i;
                }
            }
        }
        return false;
    }

    function recursion(appMenu = [], value, isFound = false) {
        const appMenuLength = appMenu.length;
        for (let i = 0; i < appMenuLength; i++) {
            if (appMenu[i].hasOwnProperty('menu') && appMenu[i].menu) {
                if (appMenu[i].menu.url === value) {
                    isFound = true;
                    return isFound;
                }
            }
            if (appMenu[i].hasOwnProperty('children')) {
                isFound = recursion(appMenu[i].children, value, isFound);
            }
        }
        return isFound;
    }

    useEffect(() => {
        if (appState.isLogin && !appState.appInitialLoad) {
            const appMenu = appState.user.app_menu.children;
            const pathname = location.pathname;
            const index = getRootIndex(appMenu, pathname);
            let appMenuChildren = appMenu[index];
            if (appMenuChildren && appMenuChildren.hasOwnProperty('children')) {
                appMenuChildren = appMenuChildren.children;
            }
            setState((prevState) => ({
                ...prevState,
                loading: false,
                appMenu: appMenu,
                appMenuChildren: appMenuChildren,
            }));
        }
    }, [appState.isLogin, appState.appInitialLoad]);

    function onLogout() {
        useFetch('/api/logout', POST).then((response) => {
            appContext.setAppState((prevState) => ({
                ...prevState,
                isLogin: false,
                accessRights: false,
                userEmail: false,
                globalSetting: {},
                user: {},
                appInitialLoad: true,
            }));
            message.success('Logged Out!');
            reset();
            history.push('/login');
        });
    }

    const sectionMenu = state.appMenuChildren ? state.appMenuChildren.map((menu) => {
        if (menu.children.length) {
            return {
                label: menu.label,
                key: `section-menu-${menu.id}`,
                children: menu.children.map((child) => ({
                    label: child.menu_id ? <Link
                        to={child.menu.url}
                        onClick={() => {
                            resetBreadcrumbs(child.menu.url);
                        }}>
                        {child.label}
                    </Link> : child.label, key: `section-menu-child-${child.id}`
                }))
            }
        }
        return {
            label: menu.menu_id ? <Link to={menu.menu.url}>{menu.label}</Link> : menu.label,
            key: `section-menu-${menu.id}`,
            onClick: () => {
                resetBreadcrumbs(menu.menu.url);
            }
        }
    }) : {};

    const items = [];

    items.push({
        label: '',
        key: 'app-menu',
        icon: <AppstoreOutlined/>,
        children: state.appMenu.map((appMenu) => ({
            label: <Link to={appMenu.menu.url}>{appMenu.label}</Link>,
            key: `app-menu-${appMenu.id}`,
            onClick: () => {
                const index = state.appMenu.findIndex(m => m.id === appMenu.id);
                resetBreadcrumbs(appMenu.menu.url);
                setState((prevState) => ({
                    ...prevState, appMenuChildren: state.appMenu[index].children
                }));
            }
        })),
    });

    if (typeof sectionMenu === 'object' && objectHasValue(sectionMenu)) {
        items.push(...sectionMenu);
    }

    items.push({
        label: '',
        key: 'systray-menu',
        icon: <AvatarUser/>,
        className: 'top-nav-avatar',
        children: [{
            label: 'Logout',
            onClick: () => {
                onLogout()
            }
        },]
    });

    return (
        <Spin spinning={state.loading}>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    padding: 0,
                    height: '50px',
                    lineHeight: '50px',
                }}
            >
                <Menu
                    theme={'dark'}
                    mode={'horizontal'}
                    items={items}
                />
            </Header>
        </Spin>
    );
}
export default CustomMenu;
