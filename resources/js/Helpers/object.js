import moment from 'moment';

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
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    for (let k in obj) {
        if (typeof obj[k] == "object" && obj[k] !== null)
            formatInitialValuesDatetimeToMoment(obj[k]);
        else {
            if (moment(obj[k], dateFormat, true).isValid()) {
                obj[k] = moment(obj[k], dateFormat)
            }
        }
    }
}

