/**
 *
 * The payload module is the one that
 * saves your param state(on tables, and forms) when reloading a page
 *
 * that way, the table or list can requery your data because the payload
 * is saved in the local storage.
 *
 */

export const getPayloadModule = () => {
    let payloadModule = [];
    if (localStorage.getItem("payload_module")) {
        payloadModule = localStorage.getItem("payload_module");
    }
    return payloadModule;
};

export const setPayloadModule = (payload) => {
    localStorage.setItem("payload_module", payload);
};


export const getPayload = () => {
    let payload = [];
    if (localStorage.getItem("payload")) {
        payload = JSON.parse(localStorage.getItem("payload"));
    }
    return payload;
};

export const setPayload = (payload) => {
    localStorage.setItem("payload", JSON.stringify(payload));
};

// export const getClickedBreadcrumb = () => {
//     let clickedBreadcrumb = {};
//     if (localStorage.getItem("clicked_breadcrumb")) {
//         clickedBreadcrumb = JSON.parse(localStorage.getItem("clicked_breadcrumb"));
//     }
//     return clickedBreadcrumb;
// };
//
// export const setClickedBreadcrumb = (clickedBreadcrumb) => {
//     localStorage.setItem("clicked_breadcrumb", JSON.stringify(clickedBreadcrumb));
// };


