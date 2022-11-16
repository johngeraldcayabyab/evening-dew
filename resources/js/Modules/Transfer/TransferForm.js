import React, {useEffect, useState} from 'react';
import {Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemDate from "../../Components/FormItem/FormItemDate";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET, POST} from "../../consts";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import StatusBar from "../../Components/StatusBar";
import FormItemStatus from "../../Components/FormItem/FormItemStatus";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import useOptionLineHook from "../../Hooks/useOptionLineHook";
import FormItemLineId from "../../Components/FormItem/FormItemLineId";
import {getPersistedKey, isLineFieldExecute} from "../../Helpers/form";
import FormLineParent from "../../Components/FormLines/FormLineParent";
import NextPreviousRecord from "../../Components/NextPreviousRecord";
import FormItemTextArea from "../../Components/FormItem/FormItemTextArea";
import {disableIfStatus} from "../../Helpers/object"

const {TabPane} = Tabs;

const TransferForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const contactOptions = useOptionHook('/api/contacts', 'contact.name');
    const operationTypeOptions = useOptionHook('/api/operations_types', 'operation_type.name');
    const sourceLocationOptions = useOptionHook('/api/locations', 'source_location.name');
    const destinationLocationOptions = useOptionHook('/api/locations', 'destination_location.name');
    const responsibleOptions = useOptionHook('/api/users', 'responsible.name');
    const productLineOptions = useOptionLineHook('/api/products', 'product.name');
    const measurementLineOptions = useOptionLineHook('/api/measurements', 'measurement.name');

    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    useEffect(() => {
        contactOptions.getInitialOptions(formState);
        operationTypeOptions.getInitialOptions(formState);
        sourceLocationOptions.getInitialOptions(formState);
        destinationLocationOptions.getInitialOptions(formState);
        responsibleOptions.getInitialOptions(formState);
        productLineOptions.getInitialOptions(formState, 'transfer_lines');
        measurementLineOptions.getInitialOptions(formState, 'transfer_lines');
    }, [formState.initialLoad]);

    function onValuesChange(changedValues, allValues) {
        setDefaultLocationsFromOperationType(changedValues);
        isLineFieldExecute(changedValues, allValues, 'transfer_lines', 'product_id', getProductInfoAndSetValues);
    }

    function setDefaultLocationsFromOperationType(changedValues) {
        if (changedValues.operation_type_id) {
            useFetch(`/api/operations_types`, GET, {
                id: changedValues.operation_type_id
            }).then((response) => {
                const data = response.data[0];
                let sourceLocationId = data.default_source_location_id;
                let destinationLocationId = data.default_destination_location_id;
                sourceLocationOptions.getOptions({id: sourceLocationId});
                destinationLocationOptions.getOptions({id: destinationLocationId});
                form.setFieldsValue({
                    source_location_id: sourceLocationId,
                    destination_location_id: destinationLocationId
                });
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
    }

    function getProductInfoAndSetValues(line, allValues) {
        useFetch(`/api/products/${line.product_id}`, GET).then((response) => {
            const transferLines = allValues.transfer_lines;
            transferLines[line.key] = {
                ...transferLines[line.key],
                measurement_id: response.measurement_id,
            };
            form.setFieldsValue({
                transfer_lines: transferLines
            });
            const persistedKey = getPersistedKey(line, measurementLineOptions.options)
            measurementLineOptions.getOptions(response.measurement.name, persistedKey);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: manifest,
                form: form,
                formState: formState,
                formActions: formActions,
                onFinish: formActions.onFinish,
                onValuesChange: onValuesChange,
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
                    bottomColTwoRight={<NextPreviousRecord/>}
                />
                <StatusBar
                    statuses={[
                        {
                            value: 'draft',
                            title: 'Draft',
                            status: {draft: 'process', done: 'finish', cancelled: 'wait'}
                        },
                        {
                            value: 'done',
                            title: 'Done',
                            type: 'primary',
                            label: 'Validate',
                            status: {draft: 'wait', done: 'finish', cancelled: 'wait'},
                            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
                        },
                        {
                            value: 'cancelled',
                            title: 'Cancelled',
                            type: 'ghost',
                            label: 'Cancel',
                            status: {draft: 'wait', done: 'wait', cancelled: 'finish'},
                            visibility: {draft: 'visible', done: 'hidden', cancelled: 'hidden'},
                        },
                    ]}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemStatus
                                name={'status'}
                            />
                            <FormItemText
                                overrideDisabled={true}
                                label={'Reference'}
                                name={'reference'}
                                size={'large'}
                            />
                        </ColForm>
                    </RowForm>

                    <RowForm>
                        <ColForm>
                            <FormItemSelect
                                label={'Contact'}
                                name={'contact_id'}
                                {...contactOptions}
                            />

                            <FormItemSelect
                                label={'Operation Type'}
                                name={'operation_type_id'}
                                message={'Please select a operation type'}
                                required={true}
                                {...operationTypeOptions}
                            />

                            <FormItemSelect
                                label={'Source Location'}
                                name={'source_location_id'}
                                {...sourceLocationOptions}
                            />

                            <FormItemSelect
                                label={'Destination Location'}
                                name={'destination_location_id'}
                                {...destinationLocationOptions}
                            />
                        </ColForm>
                        <ColForm>
                            <FormItemDate
                                label={'Scheduled date'}
                                name={'scheduled_date'}
                            />

                            <FormItemText
                                label={'Source Document'}
                                name={'source_document'}
                            />
                            <FormItemTextArea
                                label={'Notes'}
                                name={'notes'}
                            />
                            <FormItemSelect
                                label={'Shipping Method'}
                                name={'shipping_method'}
                                message={'Please select an shipping method'}
                                required={true}
                                options={[
                                    {value: 'delivery', label: 'Delivery'},
                                    {value: 'pickup', label: 'Pickup'},
                                ]}
                            />
                        </ColForm>
                    </RowForm>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Operations" key="1">
                            <RowForm>
                                <ColForm lg={24}>
                                    <FormLineParent
                                        columns={['Product', 'Description', 'Demand', 'Measurement']}
                                        listName={'transfer_lines'}
                                    >
                                        <FormItemLineId name={'id'}/>
                                        <FormItemSelect
                                            placeholder={'Product'}
                                            name={'product_id'}
                                            message={'Please select a product'}
                                            required={true}
                                            optionAggregate={productLineOptions}
                                            overrideDisabled={disableIfStatus(formState, 'done')}
                                        />
                                        <FormItemText
                                            placeholder={'Description'}
                                            name={'description'}
                                        />
                                        <FormItemNumber
                                            placeholder={'Demand'}
                                            name={'demand'}
                                            message={'Please input a demand'}
                                            required={true}
                                            overrideDisabled={disableIfStatus(formState, 'done')}
                                        />
                                        <FormItemSelect
                                            placeholder={'Measurement'}
                                            name={'measurement_id'}
                                            message={'Please select a measurement'}
                                            required={true}
                                            optionAggregate={measurementLineOptions}
                                            overrideDisabled={disableIfStatus(formState, 'done')}
                                        />
                                    </FormLineParent>
                                </ColForm>
                            </RowForm>
                        </TabPane>
                        <TabPane tab="Additional Info" key="2">
                            <RowForm>
                                <ColForm>
                                    <FormItemText
                                        label={'Tracking Reference'}
                                        name={'tracking_reference'}
                                    />
                                </ColForm>
                                <ColForm>
                                    <FormItemSelect
                                        label={'Shipping Policy'}
                                        name={'shipping_policy'}
                                        message={'Please select an address type'}
                                        required={true}
                                        options={[
                                            {value: 'as_soon_as_possible', label: 'As soon as possible'},
                                            {
                                                value: 'when_all_products_are_ready',
                                                label: 'When all products are ready'
                                            },
                                        ]}
                                    />
                                    <FormItemSelect
                                        label={'Responsible'}
                                        name={'responsible_id'}
                                        {...responsibleOptions}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>

                        <TabPane tab="Note" key="3">
                            <RowForm>
                                <ColForm lg={24}>
                                    <FormItemText
                                        label={'Note'}
                                        name={'note'}
                                    />
                                </ColForm>
                            </RowForm>
                        </TabPane>
                    </Tabs>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default TransferForm;
