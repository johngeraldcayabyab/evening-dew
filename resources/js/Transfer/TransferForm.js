import React from 'react';
import {Form, Tabs} from "antd";
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
import FormItemSelect from "../components/FormItem/FormItemSelect";
import FormItemDate from "../components/FormItem/FormItemDate";

const {TabPane} = Tabs;

const TransferForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormState(id, form, manifest, true);

    return (
        <CustomForm
            form={form}
            onFinish={formActions.onFinish}
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
                            query={'source_location.name'}
                        />

                        <FormItemSelectAjax
                            form={form}
                            label={'Destination Location'}
                            name={'destination_location_id'}
                            url={'/api/locations/option'}
                            {...formState}
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
                        <RowForm>
                            <ColForm>

                            </ColForm>

                            <ColForm>

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
