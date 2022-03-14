import React, {useEffect, useState} from 'react';
import {Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../../components/FormButtons/FormButtons";
import RowForm from "../../components/Grid/RowForm";
import ColForm from "../../components/Grid/ColForm";
import CustomForm from "../../components/CustomForm";
import ControlPanel from "../../components/ControlPanel";
import FormCard from "../../components/FormCard";
import FormItemText from "../../components/FormItem/FormItemText";
import FormItemSelectAjax from "../../components/FormItem/FormItemSelectAjax";
import FormItemSelect from "../../components/FormItem/FormItemSelect";
import FormItemDate from "../../components/FormItem/FormItemDate";
import useFetchHook from "../../Hooks/useFetchHook";
import useFetchCatcher from "../../Hooks/useFetchCatcher";
import {GET, POST} from "../../consts";
import FormItemNumber from "../../components/FormItem/FormItemNumber";
import {
    checkIfADynamicInputChangedAndDoSomething,
    DynamicFieldAddButton,
    DynamicFieldRemoveButton,
    GenerateDynamicColumns
} from "../../Helpers/form";
import StatusBar from "../../components/StatusBar";
import FormItemStatus from "../../components/FormItem/FormItemStatus";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const {TabPane} = Tabs;

const TransferForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
    const [state, setState] = useState({
        defaultSourceLocationReload: false,
        defaultDestinationLocationReload: false,
        transferLinesOptionReload: [],
        transferLinesDeleted: [],
    });

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);

    function onValuesChange(changedValues, allValues) {
        if (changedValues.operation_type_id) {
            useFetch(`/api/operations_types`, GET, {
                id: changedValues.operation_type_id
            }).then((response) => {
                const responseData = response.data[0];
                let sourceLocation = responseData.default_source_location;
                let destinationLocation = responseData.default_destination_location;
                let sourceLocationId = responseData.default_source_location_id;
                let destinationLocationId = responseData.default_destination_location_id;
                setState((prevState) => ({
                    ...prevState,
                    defaultSourceLocationReload: sourceLocation ? sourceLocation.name : false,
                    defaultDestinationLocationReload: destinationLocation ? destinationLocation.name : false,
                }));
                form.setFieldsValue({
                    source_location_id: sourceLocationId,
                    destination_location_id: destinationLocationId
                });
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        }
        checkIfADynamicInputChangedAndDoSomething(changedValues, allValues, 'transfer_lines', 'product_id', getProductDataAndFillDefaultValues);
    }

    function getProductDataAndFillDefaultValues(changedTransferLine, transferLines) {
        useFetch(`/api/products`, GET, {
            id: changedTransferLine.product_id
        }).then((response) => {
            const product = response.data[0];
            transferLines[changedTransferLine.key] = {
                ...transferLines[changedTransferLine.key],
                ...{
                    measurement_id: product.measurement_id,
                    isReload: product.measurement.name
                }
            };
            setTransferLinesReload(transferLines);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    function setTransferLinesReload(transferLines) {
        setState((prevState) => ({
            ...prevState,
            transferLinesOptionReload: transferLines
        }));
        form.setFieldsValue({
            transfer_lines: transferLines
        });
    }

    function onFinish(values) {
        if (id) {
            if (state.transferLinesDeleted.length) {
                useFetch(`/api/transfer_lines/mass_destroy`, POST, {ids: state.transferLinesDeleted}).then(() => {
                    setState((prevState) => ({
                        ...prevState,
                        transferLinesDeleted: [],
                        transferLinesOptionReload: [],
                    }));
                }).catch((responseErr) => {
                    fetchCatcher.get(responseErr);
                });
            }
        }
        formActions.onFinish(values);
    }

    return (
        <CustomForm
            form={form}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
        >
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                bottomColOneLeft={
                    <FormButtons
                        id={id}
                        form={form}
                        formState={formState}
                        formActions={formActions}
                        manifest={manifest}
                    />
                }
            />
            <StatusBar
                id={id}
                form={form}
                formState={formState}
                formActions={formActions}
                manifest={manifest}
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
            <FormCard {...formState}>
                <RowForm>
                    <ColForm>
                        <FormItemStatus
                            form={form}
                            name={'status'}
                            {...formState}
                        />

                        <FormItemText
                            overrideDisabled={true}
                            form={form}
                            label={'Reference'}
                            name={'reference'}
                            size={'large'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>

                <RowForm>
                    <ColForm>
                        <FormItemSelectAjax
                            form={form}
                            label={'Contact'}
                            name={'contact_id'}
                            url={'/api/contacts/option'}
                            {...formState}
                            query={'contact.name'}
                        />


                        <FormItemSelectAjax
                            form={form}
                            label={'Operation Type'}
                            name={'operation_type_id'}
                            message={'Please select a operation type'}
                            required={true}
                            url={'/api/operations_types/option'}
                            {...formState}
                            query={'operation_type.name'}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Source Location'}
                            name={'source_location_id'}
                            url={'/api/locations/option'}
                            {...formState}
                            search={state.defaultSourceLocationReload}
                            query={'source_location.name'}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Destination Location'}
                            name={'destination_location_id'}
                            url={'/api/locations/option'}
                            {...formState}
                            search={state.defaultDestinationLocationReload}
                            query={'destination_location.name'}
                        />
                    </ColForm>
                    <ColForm>

                        <FormItemDate
                            form={form}
                            label={'Scheduled date'}
                            name={'scheduled_date'}
                            {...formState}
                        />

                        <FormItemText
                            form={form}
                            label={'Source Document'}
                            name={'source_document'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Operations" key="1">
                        <GenerateDynamicColumns
                            columns={['Product', 'Description', 'Demand', 'Measurement']}
                        />

                        <RowForm>
                            <ColForm lg={24}>
                                <Form.List name="transfer_lines">
                                    {(fields, {add, remove}) => (
                                        <>
                                            {fields.map(({key, name, ...restField}) => (
                                                <RowForm key={key}>
                                                    <ColForm lg={23}>
                                                        <FormItemNumber
                                                            form={form}
                                                            {...restField}
                                                            name={'id'}
                                                            {...formState}
                                                            style={{display: 'hidden', position: 'absolute'}}
                                                            groupName={name}
                                                            listName={'transfer_lines'}
                                                        />

                                                        <FormItemSelectAjax
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Product'}
                                                            name={'product_id'}
                                                            message={'Please select a product'}
                                                            required={true}
                                                            url={'/api/products/option'}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '25%'}}
                                                            query={`transfer_lines.${name}.product.name`}
                                                            groupName={name}
                                                            listName={'transfer_lines'}
                                                        />

                                                        <FormItemText
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Description'}
                                                            name={'description'}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '25%'}}
                                                            groupName={name}
                                                            listName={'transfer_lines'}
                                                        />

                                                        <FormItemNumber
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Demand'}
                                                            name={'demand'}
                                                            message={'Please input a demand'}
                                                            required={true}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '25%'}}
                                                            groupName={name}
                                                            listName={'transfer_lines'}
                                                        />

                                                        <FormItemSelectAjax
                                                            form={form}
                                                            {...restField}
                                                            placeholder={'Measurement'}
                                                            name={'measurement_id'}
                                                            message={'Please select a measurement'}
                                                            required={true}
                                                            url={'/api/measurements/option'}
                                                            search={state.transferLinesOptionReload[name] ? state.transferLinesOptionReload[name].isReload : null}
                                                            {...formState}
                                                            style={{display: 'inline-block', width: '25%'}}
                                                            query={`transfer_lines.${name}.measurement.name`}
                                                            groupName={name}
                                                            listName={'transfer_lines'}
                                                        />
                                                    </ColForm>

                                                    <DynamicFieldRemoveButton
                                                        remove={remove}
                                                        form={form}
                                                        dynamicName={'transfer_lines'}
                                                        name={name}
                                                        formState={formState}
                                                        setState={setState}
                                                    />
                                                </RowForm>
                                            ))}
                                            <DynamicFieldAddButton
                                                formState={formState}
                                                add={add}
                                                label={'Add a product'}
                                            />
                                        </>
                                    )}
                                </Form.List>
                            </ColForm>
                        </RowForm>

                    </TabPane>


                    <TabPane tab="Additional Info" key="2">
                        <RowForm>
                            <ColForm>
                                <FormItemText
                                    form={form}
                                    label={'Tracking Reference'}
                                    name={'tracking_reference'}
                                    {...formState}
                                />
                            </ColForm>

                            <ColForm>
                                <FormItemSelect
                                    form={form}
                                    label={'Shipping Policy'}
                                    name={'shipping_policy'}
                                    message={'Please select an address type'}
                                    required={true}
                                    options={[
                                        {value: 'as_soon_as_possible', label: 'As soon as possible'},
                                        {value: 'when_all_products_are_ready', label: 'When all products are ready'},
                                    ]}
                                    {...formState}
                                />

                                <FormItemSelectAjax
                                    form={form}
                                    label={'Responsible'}
                                    name={'responsible_id'}
                                    url={'/api/users/option'}
                                    {...formState}
                                    query={'responsible.name'}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>

                    <TabPane tab="Note" key="3">
                        <RowForm>
                            <ColForm lg={24}>
                                <FormItemText
                                    form={form}
                                    label={'Note'}
                                    name={'note'}
                                    {...formState}
                                />
                            </ColForm>
                        </RowForm>
                    </TabPane>
                </Tabs>
            </FormCard>
        </CustomForm>
    );
};

export default TransferForm;
