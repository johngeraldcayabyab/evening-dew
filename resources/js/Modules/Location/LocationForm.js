import React, {useEffect} from 'react';
import {Divider, Form} from "antd";
import {useParams} from "react-router-dom";
import useFormHook from "../../Hooks/useFormHook";
import manifest from "./location_manifest.json";
import FormButtons from "../../Components/FormButtons/FormButtons";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import CustomForm from "../../Components/CustomForm";
import ControlPanel from "../../Components/ControlPanel";
import FormCard from "../../Components/FormCard";
import FormItemText from "../../Components/FormItem/FormItemText";
import FormItemCheckbox from "../../Components/FormItem/FormItemCheckbox";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import useOptionHook from "../../Hooks/useOptionHook";
import FormItemSelect from "../../Components/FormItem/FormItemSelect";
import NextPreviousRecord from "../../Components/NextPreviousRecord";

const LocationForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, true);
    const parentLocationOptions = useOptionHook('/api/locations', 'parent_location.name');
    useEffect(() => {
        parentLocationOptions.getInitialOptions(formState);
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
                        <ColForm lg={24}>
                            <FormItemText
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                                size={'large'}
                            />

                            <FormItemSelect
                                label={'Parent Category'}
                                name={'parent_location_id'}
                                size={'medium'}
                                {...parentLocationOptions}
                            />
                        </ColForm>
                    </RowForm>

                    <Divider orientation={'left'}>
                        Additional Information
                    </Divider>

                    <RowForm>
                        <ColForm>
                            <FormItemSelect
                                label={'Type'}
                                name={'type'}
                                message={'Please select a location type'}
                                required={true}
                                options={[
                                    {value: 'vendor', label: 'Vendor'},
                                    {value: 'view', label: 'View'},
                                    {value: 'internal', label: 'Internal'},
                                    {value: 'customer', label: 'Customer'},
                                    {value: 'inventory_loss', label: 'Inventory Loss'},
                                    {value: 'production', label: 'Production'},
                                    {value: 'transit_location', label: 'Transit Location'},
                                ]}
                            />

                            <FormItemCheckbox
                                label={'Is a scrap location?'}
                                name={'is_a_scrap_location'}
                            />

                            <FormItemCheckbox
                                label={'Is a return location?'}
                                name={'is_a_return_location'}
                            />
                        </ColForm>
                    </RowForm>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default LocationForm;
