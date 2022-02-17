import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Space} from "antd";
import {useParams} from "react-router-dom";
import useFormState from "../Hooks/useFormState";
import manifest from "./__manifest__.json";
import FormButtons from "../components/FormButtons/FormButtons";
import RowForm from "../components/Grid/RowForm";
import ColForm from "../components/Grid/ColForm";
import CustomForm from "../components/CustomForm";
import ControlPanel from "../components/ControlPanel";
import FormCard from "../components/FormCard";
import FormItemText from "../components/FormItem/FormItemText";
import FormItemSelectAjax from "../components/FormItem/FormItemSelectAjax";
import useFetchHook from "../Hooks/useFetchHook";
import useFetchCatcher from "../Hooks/useFetchCatcher";
import {GET} from "../consts";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const SalesOrderForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
    const [state, setState] = useState({
        invoiceAddressOptionReload: false,
        deliveryAddressOptionReload: false,
    });

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);

    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
            onValuesChange={(changedValues, allValues) => {
                if (changedValues.customer_id) {
                    useFetch(`/api/addresses`, GET, {
                        contact_id: changedValues.customer_id
                    }).then((response) => {
                        let defaultAddress = response.data.find((address) => (address.type === 'default'));
                        let invoiceAddress = response.data.find((address) => (address.type === 'invoice'));
                        let deliveryAddress = response.data.find((address) => (address.type === 'delivery'));
                        invoiceAddress = invoiceAddress ? invoiceAddress : defaultAddress;
                        deliveryAddress = deliveryAddress ? deliveryAddress : defaultAddress;
                        setState((prevState) => ({
                            ...prevState,
                            invoiceAddressOptionReload: invoiceAddress.address_name,
                            deliveryAddressOptionReload: deliveryAddress.address_name,
                        }));
                        form.setFieldsValue({
                            invoice_address_id: invoiceAddress.id,
                            delivery_address_id: deliveryAddress.id
                        });
                    }).catch((responseErr) => {
                        fetchCatcher.get(responseErr);
                    });
                }
            }}
        >
            <ControlPanel
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
            <FormCard {...formState}>
                <RowForm>
                    <ColForm>
                        <FormItemText
                            label={'Number'}
                            name={'number'}
                            message={'Please input number'}
                            required={true}
                            size={'large'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>

                <RowForm>
                    <ColForm>
                        <FormItemSelectAjax
                            label={'Customer'}
                            name={'customer_id'}
                            message={'Please select a customer'}
                            required={true}
                            url={'/api/contacts/option'}
                            {...formState}
                        />
                        <FormItemSelectAjax
                            label={'Invoice address'}
                            name={'invoice_address_id'}
                            message={'Please select a invoice address'}
                            required={true}
                            url={'/api/addresses/option'}
                            search={state.invoiceAddressOptionReload}
                            {...formState}
                            query={'invoice_address.address_name'}
                        />
                        <FormItemSelectAjax
                            label={'Delivery address'}
                            name={'delivery_address_id'}
                            message={'Please select a delivery address'}
                            required={true}
                            url={'/api/addresses/option'}
                            search={state.deliveryAddressOptionReload}
                            {...formState}
                            query={'delivery_address.address_name'}
                        />
                    </ColForm>
                    <ColForm>
                        <FormItemSelectAjax
                            label={'Payment Term'}
                            name={'payment_term_id'}
                            url={'/api/payment_terms/option'}
                            {...formState}
                        />
                    </ColForm>
                </RowForm>


                <RowForm>
                    <ColForm>
                        <Form.List name="users">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'first']}
                                                rules={[{ required: true, message: 'Missing first name' }]}
                                            >
                                                <Input placeholder="First Name" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'last']}
                                                rules={[{ required: true, message: 'Missing last name' }]}
                                            >
                                                <Input placeholder="Last Name" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </ColForm>
                </RowForm>
            </FormCard>
        </CustomForm>
    );
};

export default SalesOrderForm;
