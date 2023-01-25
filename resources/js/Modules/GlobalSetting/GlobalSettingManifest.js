import GlobalSettingForm from "./GlobalSettingForm";

const displayName = "global_settings";

export default {
    "moduleName": "global_settings",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}`, component: GlobalSettingForm},
    ]
};
