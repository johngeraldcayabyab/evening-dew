import React from "react";
import {SELECT_PAGE_SIZE} from "../consts"

export const isLineFieldExecute = (changedValues, allValues, lineName, field, callback) => {
    const line = getChangedLineField(changedValues, lineName, field);
    if (line && line[field]) {
        callback(line, allValues);
    }
};

export const getChangedLineField = (changedValues, lineName, field) => {
    let lines = getPresentLines(changedValues, lineName);
    let line;
    if (lines) {
        line = getChangedLine(lines, field);
    }
    if (isOnlyTwoProperty(line)) {
        return line;
    }
    return false;
}

export const getPresentLines = (changedValues, lineName) => {
    if (changedValues.hasOwnProperty(lineName)) {
        return changedValues[lineName];
    }
    return false;
}

export const getChangedLine = (lines, field) => {
    let changedLine;
    lines.forEach((line, key) => {
        changedLine = {...line, key: key};
    });
    if (changedLine && changedLine.hasOwnProperty(field)) {
        return changedLine;
    }
    return false;
}

export const getPersistedKey = (line, options) => {
    let key = 0;
    for (let persistedKey in options) {
        if (options.hasOwnProperty(persistedKey)) {
            if (line.key === key) {
                return persistedKey;
            }
            key++;
        }
    }
};

export const isOnlyTwoProperty = (line) => {
    if (line === undefined) {
        return false;
    }
    let keys = Object.keys(line);
    return keys.length === 2;
}


export const getFieldFromInitialValues = (initialValues, tableField) => {
    let field = initialValues;
    const fields = tableField.split('.');
    fields.pop();
    fields.push('id');
    fields.forEach((query) => {
        if (field && query in field) {
            field = field[query];
        } else {
            field = null;
        }
    });
    return field;
}

export const getField = (tableField) => {
    return tableField.split('.').slice(-1)[0];
}

export const payloadMaker = (params, customParams, tableField) => {
    const field = getField(tableField);
    let payload = {
        page_size: SELECT_PAGE_SIZE,
        selected_fields: ['id', 'slug', 'tag'],
        orderByColumn: field,
        orderByDirection: 'asc',
    };
    if (typeof params === 'string') {
        payload[field] = params;
    } else if (typeof params === 'object') {
        payload = {
            ...payload,
            ...params
        };
        if (customParams) {
            payload = {
                ...payload,
                ...customParams
            }
        }
    }
    return payload;
}

export const updateFormLines = (formContext, changedLine, allValues, listName, updatedValues = {}) => {
    console.log(formContext, changedLine, allValues, listName);
    const lines = allValues[listName];
    lines[changedLine.key] = {
        ...lines[changedLine.key],
        ...updatedValues
    };
    const fieldsValue = {};
    fieldsValue[listName] = lines;
    formContext.form.setFieldsValue(fieldsValue);
}
