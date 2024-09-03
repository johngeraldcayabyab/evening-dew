import {CREATE, LIST, UPDATE} from "../consts";
import {getGlobalSettings} from "./localstorage"

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

export const parseFloatComma = (float) => {
    return parseFloat(float.replace(',', ''));
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

export const percentageOrCurrency = (discountType, discountRate) => {
    if (discountType === 'percentage') {
        return `${discountRate}%`;
    }
    return toCurrency(discountRate);
}

export const toCurrency = (num, position = 'left') => {
    const globalSettings = getGlobalSettings();
    const currency = globalSettings.hasOwnProperty('currency') ? globalSettings.currency : null;
    const symbol = `${currency.symbol ? currency.symbol : ''} `;
    let money = (num ? num : 0).toLocaleString('en-US', {maximumFractionDigits: 2});
    if (symbol) {
        if (position === 'right') {
            return `${money} ${symbol}`;
        }
        return `${symbol} ${money}`;
    }
    return money;
}

export const snakeToCamel = s => s.replace(/(_\w)/g, k => k[1].toUpperCase());
