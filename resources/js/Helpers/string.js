import {CREATE, LIST, UPDATE} from "../consts";

export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const titleCase = (string) => {
    if (string) {
        let splitStr = string.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }
    return string;
};

export const replaceUnderscoreWithSpace = (string) => {
    if (string) {
        return string.replace(/_/g, ' ');
    }
    return string;
};

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const listKey = (name) => {
    return `${name}-${LIST}`;
};

export const createKey = (name) => {
    return `${name}-${CREATE}`;
};

export const updateKey = (name) => {
    return `${name}-${UPDATE}`;
};

export const insertDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const snakeToCamel = s => s.replace(/(_\w)/g, k => k[1].toUpperCase());
