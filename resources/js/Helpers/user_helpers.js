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
