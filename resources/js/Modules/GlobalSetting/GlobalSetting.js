import global_setting_manifest from "./global_setting_manifest.json"
import GlobalSettingForm from "./GlobalSettingForm"

export default {
    "moduleName": "global_settings",
    "displayName": "global_settings",
    "queryDefaults": {},
    "routes": [
        {path: `/${global_setting_manifest.displayName}`, component: GlobalSettingForm},
    ]
};
