export const getUser = () => {
    let user = {};
    if (localStorage.getItem("user")) {
        user = JSON.parse(localStorage.getItem("user"));
    }
    return user;
};

export const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getGlobalSetting = () => {
    let globalSetting = {};
    if (localStorage.getItem("globalSetting")) {
        globalSetting = JSON.parse(localStorage.getItem("globalSetting"));
    }
    return globalSetting;
};

export const setGlobalSetting = (globalSetting) => {
    localStorage.setItem("globalSetting", JSON.stringify(globalSetting));
};
