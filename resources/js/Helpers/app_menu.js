export const getAppMenu = () => {
    let appMenu = {};
    if (localStorage.getItem("app_menu")) {
        appMenu = JSON.parse(localStorage.getItem("app_menu"));
    }
    return appMenu;
};

export const setAppMenu = (appMenu) => {
    localStorage.setItem("app_menu", JSON.stringify(appMenu));
};
