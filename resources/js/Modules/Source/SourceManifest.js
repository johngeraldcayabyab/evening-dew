import SourceForm from "./SourceForm";
import SourceTable from "./SourceTable";

const displayName = "sources";

export default {
    "moduleName": "sources",
    "displayName": displayName,
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: SourceForm},
        {path: `/${displayName}/:id`, component: SourceForm},
        {path: `/${displayName}`, component: SourceTable},
    ],
    form: {
        row_1: {
            col_1: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    message: 'Please input name',
                    required: true
                },
                {
                    type: 'text',
                    name: 'color',
                    label: 'Color',
                },
            ]
        }
    }
};
