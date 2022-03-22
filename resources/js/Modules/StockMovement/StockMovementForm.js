import React from 'react';
import {Form} from "antd";
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
import FormItemNumber from "../../Components/FormItem/FormItemNumber";
import FormItemSelectAjax from "../../Components/FormItem/FormItemSelectAjax";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";

const StockMovementForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);

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

                            <FormItemSelectAjax
                                label={'Product'}
                                name={'product_id'}
                                message={'Please select product'}
                                required={true}
                                url={'/api/products'}
                                query={'product.name'}
                            />

                            <FormItemSelectAjax
                                label={'Source Location'}
                                name={'source_location_id'}
                                message={'Please select source location'}
                                required={true}
                                url={'/api/locations'}
                                query={'source_location.name'}
                            />

                            <FormItemSelectAjax
                                label={'Destination Location'}
                                name={'destination_location_id'}
                                message={'Please select destination location'}
                                required={true}
                                url={'/api/locations'}
                                query={'destination_location.name'}
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