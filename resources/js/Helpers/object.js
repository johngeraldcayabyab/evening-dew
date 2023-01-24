import moment from 'moment';
import {DATE_FORMAT} from "../consts";

export const cleanObject = (obj) => {
    for (let propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}

export const objectHasValue = (obj) => {
    return obj && Object.keys(obj).length;
}

export const formatInitialValuesDatetimeToMoment = (obj) => {
    for (let k in obj) {
        if (typeof obj[k] == "object" && obj[k] !== null)
            formatInitialValuesDatetimeToMoment(obj[k]);
        else {
            if (moment(obj[k], DATE_FORMAT, true).isValid()) {
                obj[k] = formatToMoment(obj[k]);
            }
        }
    }
}

export const formatToMoment = (obj) => {
    return moment(obj, DATE_FORMAT);
}

export const isShowButton = (appContext, moduleName, access) => {
    const accessRights = appContext.appState.accessRights;
    if (accessRights) {
        return accessRights.find(accessRight => {
            if (accessRight.name.includes(moduleName)) {
                return accessRight[access];
            }
        });
    }
    return false;
}

export const disableIfStatus = (formState, status) => {
    if (formState.initialValues.status === status) {
        return true;
    }
    return false;
}
