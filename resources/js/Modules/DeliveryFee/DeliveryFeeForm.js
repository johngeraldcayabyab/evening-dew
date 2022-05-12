import React, {useEffect, useState} from 'react';
import {Form, Tabs} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./__manifest__.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import useFetchHook from "../../Hooks/useFetchHook";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {POST} from "../../consts";
import FormLineParent from "../../Components/FormLines/FormLineParent";
import FormItemLineId from "../../Components/FormItem/FormItemLineId";
import useOptionLineHook from "../../Hooks/useOptionLineHook";

const {TabPane} = Tabs;

const DeliveryFeeForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        deliveryFeeLinesDeleted: [],
    });

    const cityOptions = useOptionLineHook('/api/cities', 'cities.name');

    useEffect(() => {
        cityOptions.getInitialOptions(formState, 'delivery_fee_lines');
    }, [formState.initialValues]);

    function onFinish(values) {
        if (id) {
            if (state.deliveryFeeLinesDeleted.length) {
                useFetch(`/api/delivery_fee_lines/mass_destroy`, POST, {ids: state.deliveryFeeLinesDeleted}).then(() => {
                    setState((prevState) => ({
                        ...prevState,
                        deliveryFeeLinesDeleted: [],
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
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                            />

                            <FormItemCheckbox
                                label={'Enabled'}
                                name={'is_enabled'}
                            />
                        </ColForm>
                    </RowForm>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Fee Lines" key="1">
                            <RowForm>
                                <ColForm lg={24}>
                                    <FormLineParent
                                        columns={['City', 'Amount']}
                                        listName={'delivery_fee_lines'}
                                    >
                                        <FormItemLineId name={'id'}/>
                                        <FormItemSelect
                                            placeholder={'City'}
                                            name={'city_id'}
                                            message={'Please select a city'}
                                            required={true}
                                            optionAggregate={cityOptions}
                                        />
                                        <FormItemNumber
                                            placeholder={'Amount'}
                                            name={'amount'}
                                            message={'Please input a amount'}
                                            required={true}
                                        />
                                    </FormLineParent>
                                </ColForm>
                            </RowForm>
                        </TabPane>
                    </Tabs>


                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};


export default DeliveryFeeForm;
