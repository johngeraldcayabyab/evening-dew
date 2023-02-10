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
}
