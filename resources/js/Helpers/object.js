import {DATE_FORMAT} from "../consts";
import dayjs from "dayjs"

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

export const loopThroughObjRecurs = (obj, propExec) => {
    for (const k in obj) {
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            loopThroughObjRecurs(obj[k], propExec)
        } else if (obj.hasOwnProperty(k)) {
            propExec(k, obj[k], obj)
        }
    }
}

export const formatInitialValuesDatetimeToDayjs = (obj) => {
    for (let k in obj) {
        if (typeof obj[k] == "object" && obj[k] !== null)
            formatInitialValuesDatetimeToDayjs(obj[k]);
        else {
            if (dayjs(obj[k], DATE_FORMAT, true).isValid()) {
                obj[k] = formatToDayjs(obj[k]);
            }
        }
    }
}

export const formatToDayjs = (obj) => {
    return dayjs(obj, DATE_FORMAT);
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
