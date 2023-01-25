import SequenceForm from "./SequenceForm";
import SequenceTable from "./SequenceTable";

const displayName = "sequences";

export default {
    "moduleName": "sequences",
    "displayName": "sequences",
    "queryDefaults": {},
    "routes": [
        {path: `/${displayName}/create`, component: SequenceForm},
        {path: `/${displayName}/:id`, component: SequenceForm},
        {path: `/${displayName}`, component: SequenceTable},
    ],
    getInitialValue: true,
    formFields: [
        [
            [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    message: 'Please input name',
                    required: true
                },
                {
                    type: 'select',
                    name: 'implementation',
                    label: 'Implementation',
                    message: 'Please select an implementation',
                    required: true,
                    options: [
                        {value: 'no_gap', label: 'No Gap'},
                        {value: 'standard', label: 'Standard'},
                    ]
                },
            ],
            [
                {
                    type: 'text',
                    name: 'sequence_code',
                    label: 'Sequence Code',
                    message: 'Please input sequence code',
                    required: true
                },
            ],
        ],
        'divider',
        [
            [
                {
                    type: 'text',
                    name: 'prefix',
                    label: 'Prefix',
                },
                {
                    type: 'text',
                    name: 'suffix',
                    label: 'Suffix',
                },
            ],
            [
                {
                    type: 'number',
                    name: 'sequence_size',
                    label: 'Sequence Size',
                    message: 'Please input sequence size',
                    required: true
                },
                {
                    type: 'number',
                    name: 'step',
                    label: 'Step',
                    message: 'Please input step',
                    required: true
                },
                {
                    type: 'number',
                    name: 'next_number',
                    label: 'Next number',
                    message: 'Please input next number',
                    required: true
                },
            ],
        ],
    ],
};
