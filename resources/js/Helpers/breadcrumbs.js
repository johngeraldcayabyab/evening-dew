export const addBreadcrumbs = (breadcrumb) => {
    let breadcrumbs = [];
    if (localStorage.getItem("breadcrumbs")) {
        breadcrumbs = JSON.parse(localStorage.getItem("breadcrumbs"));
    }
    breadcrumbs.push(breadcrumb);
    localStorage.setItem("breadcrumbs", JSON.stringify(breadcrumbs));
};

export const getBreadcrumbs = () => {
    let breadcrumbs = [];
    if (localStorage.getItem("breadcrumbs")) {
        breadcrumbs = JSON.parse(localStorage.getItem("breadcrumbs"));
    }
    return breadcrumbs;
};

export const setBreadcrumbs = (breadcrumbs) => {
    localStorage.setItem("breadcrumbs", JSON.stringify(breadcrumbs));
};


