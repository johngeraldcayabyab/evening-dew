export const getGlobalSettings = () => {
    return JSON.parse(localStorage.getItem('globalSettings'));
};
