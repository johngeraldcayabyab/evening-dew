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
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import FormItemDate from "../../Components/FormItem/FormItemDate";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET, POST} from "../../consts";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import {checkIfADynamicInputChangedAndDoSomething} from "../../Helpers/form";
import StatusBar from "../../Components/StatusBar";
import FormItemStatus from "../../Components/FormItem/FormItemStatus";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import AddLineButton from "../../Components/FormLines/AddLineButton";
import RemoveLineButton from "../../Components/FormLines/RemoveLineButton";
import LineColumn from "../../Components/FormLines/LineColumn";

const {TabPane} = Tabs;

const TransferForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
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
        <FormContextProvider
            value={{
                id: id,
                manifest: manifest,
                form: form,
                formState: formState,
                formActions: formActions,
                onFinish: onFinish,
                onValuesChange: onValuesChange,
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
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
                            <FormItemSelectAjax
                                label={'Contact'}
                                name={'contact_id'}
                                url={'/api/contacts'}
                                query={'contact.name'}
                            />


                            <FormItemSelectAjax
                                label={'Operation Type'}
                                name={'operation_type_id'}
                                message={'Please select a operation type'}
                                required={true}
                                url={'/api/operations_types'}
                                query={'operation_type.name'}
                            />

                            <FormItemSelectAjax
                                label={'Source Location'}
                                name={'source_location_id'}
                                url={'/api/locations'}
                                search={state.defaultSourceLocationReload}
                                query={'source_location.name'}
                            />

                            <FormItemSelectAjax
                                label={'Destination Location'}
                                name={'destination_location_id'}
                                url={'/api/locations'}
                                search={state.defaultDestinationLocationReload}
                                query={'destination_location.name'}
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
                        </ColForm>
                    </RowForm>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Operations" key="1">
                            <LineColumn
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
                                                                {...restField}
                                                                name={'id'}
                                                                style={{display: 'hidden', position: 'absolute'}}
                                                                groupName={name}
                                                                listName={'transfer_lines'}
                                                            />

                                                            <FormItemSelectAjax
                                                                {...restField}
                                                                placeholder={'Product'}
                                                                name={'product_id'}
                                                                message={'Please select a product'}
                                                                required={true}
                                                                url={'/api/products'}
                                                                style={{display: 'inline-block', width: '25%'}}
                                                                query={`transfer_lines.${name}.product.name`}
                                                                groupName={name}
                                                                listName={'transfer_lines'}
                                                            />

                                                            <FormItemText
                                                                {...restField}
                                                                placeholder={'Description'}
                                                                name={'description'}
                                                                style={{display: 'inline-block', width: '25%'}}
                                                                groupName={name}
                                                                listName={'transfer_lines'}
                                                            />

                                                            <FormItemNumber
                                                                {...restField}
                                                                placeholder={'Demand'}
                                                                name={'demand'}
                                                                message={'Please input a demand'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: '25%'}}
                                                                groupName={name}
                                                                listName={'transfer_lines'}
                                                            />

                                                            <FormItemSelectAjax
                                                                {...restField}
                                                                placeholder={'Measurement'}
                                                                name={'measurement_id'}
                                                                message={'Please select a measurement'}
                                                                required={true}
                                                                url={'/api/measurements'}
                                                                search={state.transferLinesOptionReload[name] ? state.transferLinesOptionReload[name].isReload : null}
                                                                style={{display: 'inline-block', width: '25%'}}
                                                                query={`transfer_lines.${name}.measurement.name`}
                                                                groupName={name}
                                                                listName={'transfer_lines'}
                                                            />
                                                        </ColForm>

                                                        <RemoveLineButton
                                                            remove={remove}
                                                            dynamicName={'transfer_lines'}
                                                            name={name}
                                                        />
                                                    </RowForm>
                                                ))}
                                                <AddLineButton
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

                                    <FormItemSelectAjax
                                        label={'Responsible'}
                                        name={'responsible_id'}
                                        url={'/api/users'}
                                        query={'responsible.name'}
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
