import {eraseCookie} from "./cookie"
import {setBreadcrumbs, setClickedBreadcrumb} from "./breadcrumbs"
import {setPayload, setPayloadModule} from "./localstorage"

export const reset = () => {
    eraseCookie('Authorization');
    eraseCookie('userEmail');
    setBreadcrumbs([]);
    setClickedBreadcrumb({});
    setPayload({});
    setPayloadModule('');

    localStorage.removeItem("user");
    localStorage.removeItem("accessRights");
    localStorage.removeItem("globalSettings");
}

export const resetThenRedirect = () => {
    reset();
    window.location.replace("/login");
}
