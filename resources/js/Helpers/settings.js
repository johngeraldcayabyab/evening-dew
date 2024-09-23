export const getGlobalSettings = () => {
    return JSON.parse(localStorage.getItem('globalSettings'));
};

export const getCompany = () => {
    const globalSettings = getGlobalSettings();
    return globalSettings.hasOwnProperty('company') ? globalSettings.company : null;
}

export const getColumnsView = (viewType) => {
    const globalSettings = getGlobalSettings();
    return globalSettings.hasOwnProperty(`${viewType}_columns_view`) ? globalSettings[`${viewType}_columns_view`].split(',') : null;
}

export const getBreakdownView = (module) => {
    const globalSettings = getGlobalSettings();
    return globalSettings.hasOwnProperty(`${module}_breakdown_view`) ? globalSettings[`${module}_breakdown_view`].split(',') : null;
}
