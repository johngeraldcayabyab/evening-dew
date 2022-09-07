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

export const selectTimeOptions = () => {
    return [
        {value: '11_00_AM_01_00_PM', label: '11:00 AM - 01:00 PM'},
        {value: '01_00_PM_03_00_PM', label: '01:00 PM - 03:00 PM'},
        {value: '03_00_PM_04_00_PM', label: '03:00 PM - 04:00 PM'},
        {value: '04_00_PM_05_30_PM', label: '04:00 PM - 05:30 PM'},
        {value: '04_00_PM_06_00_PM', label: '04:00 PM - 06:00 PM'},
        {value: '05_30_PM_06_30_PM', label: '05:30 PM - 06:30 PM'},
        {value: '06_00_PM_07_00_PM', label: '06:00 PM - 07:00 PM'},
    ];
}

