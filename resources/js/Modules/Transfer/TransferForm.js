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
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import FormItemDate from "../../Components/FormItem/FormItemDate";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET, POST} from "../../consts";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import StatusBar from "../../Components/StatusBar";
import FormItemStatus from "../../Components/FormItem/FormItemStatus";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import useFetchHook from "../../Hooks/useFetchHook";
import {FormContextProvider} from "../../Contexts/FormContext";
import AddLineButton from "../../Components/FormLines/AddLineButton";
import RemoveLineButton from "../../Components/FormLines/RemoveLineButton";
import LineColumn from "../../Components/FormLines/LineColumn";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelectTest from "../../Components/FormItem/FormItemSelectTest";
import useOptionLineHook from "../../Hooks/useOptionLineHook";

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
    const [state, setState] = useState({
        transferLinesDeleted: [],
    });

    useEffect(() => {
        contactOptions.getInitialOptions(formState);
        operationTypeOptions.getInitialOptions(formState);
        sourceLocationOptions.getInitialOptions(formState);
        destinationLocationOptions.getInitialOptions(formState);
        responsibleOptions.getInitialOptions(formState);
        productLineOptions.getInitialOptions(formState, 'transfer_lines');
        measurementLineOptions.getInitialOptions(formState, 'transfer_lines');
    }, [formState.initialLoad]);


    /**
     * This thing can only understand the resetting key
     *
     */
    function onValuesChange(changedValues, allValues) {
        // console.log(changedValues, allValues);
        setDefaultLocationsFromOperationType(changedValues);
        // const line = getSpecificLine(changedValues);
        // if (line) {
        //     console.log(line);
        // }
        // checkIfADynamicInputChangedAndDoSomething(changedValues, allValues, 'transfer_lines', 'product_id', getProductDataAndFillDefaultValues);
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

    // function getProductDataAndFillDefaultValues(changedTransferLine, transferLines) {
    //     useFetch(`/api/products`, GET, {
    //         id: changedTransferLine.product_id
    //     }).then((response) => {
    //         const product = response.data[0];
    //         transferLines[changedTransferLine.key] = {
    //             ...transferLines[changedTransferLine.key],
    //             ...{
    //                 measurement_id: product.measurement_id,
    //                 isReload: product.measurement.name
    //             }
    //         };
    //         setTransferLinesReload(transferLines);
    //     }).catch((responseErr) => {
    //         fetchCatcher.get(responseErr);
    //     });
    // }
    //
    // function setTransferLinesReload(transferLines) {
    //     setState((prevState) => ({
    //         ...prevState,
    //         transferLinesOptionReload: transferLines
    //     }));
    //     form.setFieldsValue({
    //         transfer_lines: transferLines
    //     });
    // }

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
                state: state,
                setState: setState,
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
                            <FormItemSelectTest
                                label={'Contact'}
                                name={'contact_id'}
                                {...contactOptions}
                            />

                            <FormItemSelectTest
                                label={'Operation Type'}
                                name={'operation_type_id'}
                                message={'Please select a operation type'}
                                required={true}
                                {...operationTypeOptions}
                            />

                            <FormItemSelectTest
                                label={'Source Location'}
                                name={'source_location_id'}
                                {...sourceLocationOptions}
                            />

                            <FormItemSelectTest
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

                                                            <FormItemSelectTest
                                                                {...restField}
                                                                placeholder={'Product'}
                                                                name={'product_id'}
                                                                message={'Please select a product'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: '25%'}}
                                                                groupName={name}
                                                                listName={'transfer_lines'}
                                                                options={productLineOptions.options[parseInt(restField.fieldKey)]}
                                                                onSearch={(search) => (productLineOptions.onSearch(search, restField.fieldKey))}
                                                                onClear={() => productLineOptions.onClear(restField.fieldKey)}
                                                                addSelf={()=> productLineOptions.addSelf(restField.fieldKey)}
                                                                removeSelf={()=> productLineOptions.removeSelf(restField.fieldKey)}
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

                                                            <FormItemSelectTest
                                                                {...restField}
                                                                placeholder={'Measurement'}
                                                                name={'measurement_id'}
                                                                message={'Please select a measurement'}
                                                                required={true}
                                                                style={{display: 'inline-block', width: '25%'}}
                                                                groupName={name}
                                                                listName={'transfer_lines'}
                                                                options={measurementLineOptions.options[parseInt(restField.fieldKey)]}
                                                                onSearch={(search) => measurementLineOptions.onSearch(search, restField.fieldKey)}
                                                                onClear={() => measurementLineOptions.onClear(restField.fieldKey)}
                                                                addSelf={()=> measurementLineOptions.addSelf(restField.fieldKey)}
                                                                removeSelf={()=> measurementLineOptions.removeSelf(restField.fieldKey)}
                                                            />
                                                        </ColForm>

                                                        <RemoveLineButton
                                                            remove={remove}
                                                            listName={'transfer_lines'}
                                                            name={name}
                                                        />
                                                    </RowForm>
                                                ))}
                                                <AddLineButton add={add} label={'Add a product'}/>
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

                                    <FormItemSelectTest
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
