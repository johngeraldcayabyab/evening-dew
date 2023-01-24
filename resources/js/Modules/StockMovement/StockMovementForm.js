import React, {useEffect} from 'react';
import {Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./stock_movement_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const StockMovementForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest);

    const productOptions = useOptionHook('/api/products', 'product.name');
    const sourceLocationOptions = useOptionHook('/api/locations', 'source_location.name');
    const destinationLocationOptions = useOptionHook('/api/locations', 'destination_location.name');

    useEffect(() => {
        productOptions.getInitialOptions(formState);
        sourceLocationOptions.getInitialOptions(formState);
        destinationLocationOptions.getInitialOptions(formState);
    }, [formState.initialLoad]);

    return (
        <FormContextProvider
            value={{
                id: id,
                manifest: manifest,
                form: form,
                formState: formState,
                formActions: formActions,
                onFinish: formActions.onFinish
            }}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
                    bottomColTwoRight={<NextPreviousRecord/>}
                />
                <FormCard>
                    <RowForm>
                        <ColForm>
                            <FormItemText
                                label={'Reference'}
                                name={'reference'}
                                message={'Please input reference'}
                                required={true}
                            />
                            <FormItemText
                                label={'Source'}
                                name={'source'}
                            />

                            <FormItemSelect
                                label={'Product'}
                                name={'product_id'}
                                message={'Please select product'}
                                required={true}
                                {...productOptions}
                            />

                            <FormItemSelect
                                label={'Source Location'}
                                name={'source_location_id'}
                                message={'Please select source location'}
                                required={true}
                                {...sourceLocationOptions}
                            />

                            <FormItemSelect
                                label={'Destination Location'}
                                name={'destination_location_id'}
                                message={'Please select destination location'}
                                required={true}
                                {...destinationLocationOptions}
                            />

                            <FormItemNumber
                                label={'Quantity Done'}
                                name={'quantity_done'}
                                message={'Please input quantity done'}
                                required={true}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default StockMovementForm;
