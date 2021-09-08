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
};

export const replaceUnderscoreWithSpace = (string, toTitleCase = false) => {
    if (string) {
        let theReturn = string.replace(/_/g, ' ');
        if (toTitleCase) {
            theReturn = titleCase(theReturn);
        }
        return theReturn;
    }
};
