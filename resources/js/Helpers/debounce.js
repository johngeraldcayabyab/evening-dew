export const debounce = (func, thisContext) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, 250);
    };
}
