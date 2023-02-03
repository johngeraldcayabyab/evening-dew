import React, {useEffect} from 'react';
// import {Form} from "antd";
// import {useParams} from "react-router-dom";
// import useFormHook from "../../Hooks/useFormHook";
// import FormButtons from "../../Components/FormButtons/FormButtons";
// import RowForm from "../../Components/Grid/RowForm";
// import ColForm from "../../Components/Grid/ColForm";
// import CustomForm from "../../Components/CustomForm";
// import FormItemText from "../../Components/FormItem/FormItemText";
// import ControlPanel from "../../Components/ControlPanel";
// import FormCard from "../../Components/FormCard";
// import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
// import {FormContextProvider} from "../../Contexts/FormContext";
// import useOptionHook from "../../Hooks/useOptionHook";
// import FormItemSelect from "../../Components/FormItem/FormItemSelect";
// import NextPreviousRecord from "../../Components/NextPreviousRecord";
import CityManifest from "./CityManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const CityForm = () => {
    return <FormGenerator {...CityManifest} />
};

// const CityForm = () => {
//     let {id} = useParams();
//     const [form] = Form.useForm();
//     const [formState, formActions] = useFormHook(id, form, CityManifest);
//     const regionOptions = useOptionHook('/api/regions', 'region.region');
//
//     useEffect(() => {
//         regionOptions.getInitialOptions(formState);
//     }, [formState.initialLoad]);
//
//
//     return (
//         <FormContextProvider
//             value={{
//                 id: id,
//                 manifest: CityManifest,
//                 form: form,
//                 formState: formState,
//                 formActions: formActions,
//                 onFinish: formActions.onFinish
//             }}
//         >
//             <CustomForm>
//                 <ControlPanel
//                     topColOneLeft={<CustomBreadcrumb/>}
//                     bottomColOneLeft={<FormButtons/>}
//                     bottomColTwoRight={<NextPreviousRecord/>}
//                 />
//                 <FormCard>
//                     <RowForm>
//                         <ColForm>
//                             <FormItemText
//                                 label={'Name'}
//                                 name={'name'}
//                                 message={'Please input name'}
//                                 required={true}
//                             />
//
//                             <FormItemText
//                                 label={'Province'}
//                                 name={'province'}
//                             />
//
//                             <FormItemSelect
//                                 label={'Region'}
//                                 name={'region_id'}
//                                 {...regionOptions}
//                             />
//                         </ColForm>
//                     </RowForm>
//                 </FormCard>
//             </CustomForm>
//         </FormContextProvider>
//     );
// };


export default CityForm;
