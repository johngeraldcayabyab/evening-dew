import React, {useEffect} from 'react';
import {Divider, Form, Tabs} from "antd";
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
import FormItemUpload from "../../Components/FormItem/FormItemUpload";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {FormContextProvider} from "../../Contexts/FormContext";
import NextPreviousRecord from "../../Components/NextPreviousRecord";
import FormLineParent from "../../Components/FormLines/FormLineParent"
import FormItemLineId from "../../Components/FormItem/FormItemLineId"
import FormItemSelect from "../../Components/FormItem/FormItemSelect"
import useOptionLineHook from "../../Hooks/useOptionLineHook"
import useOptionHook from "../../Hooks/useOptionHook"

const {TabPane} = Tabs;

const UserForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest);

    const userLineOptions = useOptionLineHook('/api/users', 'users.name');
    const groupLineOptions = useOptionLineHook('/api/groups', 'groups.name');
    const appMenuOptions = useOptionHook('/api/app_menus', 'label');

    useEffect(() => {
        userLineOptions.getInitialOptions(formState, 'user_group_lines');
        groupLineOptions.getInitialOptions(formState, 'user_group_lines');
        appMenuOptions.getInitialOptions(formState);
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
                                label={'Name'}
                                name={'name'}
                                message={'Please input name'}
                                required={true}
                                size={'large'}
                            />

                            <FormItemText
                                label={'Email'}
                                name={'email'}
                                message={'Please input email'}
                                required={true}
                                size={'medium'}
                            />

                            <FormItemSelect
                                label={'App Menu'}
                                name={'app_menu_id'}
                                {...appMenuOptions}
                            />
                        </ColForm>

                        <ColForm>
                            <FormItemUpload
                                name={'avatar'}
                            />
                        </ColForm>
                    </RowForm>


                    {!formState.id &&
                        <>
                            <Divider/>
                            <RowForm>
                                <ColForm>
                                    <FormItemText
                                        label={'Password'}
                                        name={'password'}
                                        message={'Please input password'}
                                        required={true}
                                    />
                                </ColForm>
                                <ColForm>
                                    <FormItemText
                                        label={'Confirm Password'}
                                        name={'password_confirmation'}
                                        message={'Please input password'}
                                        required={true}
                                    />
                                </ColForm>
                            </RowForm>
                        </>
                    }

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Config" key="1">
                            <RowForm>
                                <ColForm lg={24}>
                                    <FormLineParent
                                        columns={['User', 'Group']}
                                        listName={'user_group_lines'}
                                    >
                                        <FormItemLineId
                                            name={'id'}
                                        />
                                        <FormItemSelect
                                            placeholder={'User'}
                                            name={'user_id'}
                                            message={'Please select a user!'}
                                            required={true}
                                            optionAggregate={userLineOptions}
                                        />
                                        <FormItemSelect
                                            placeholder={'Group'}
                                            name={'group_id'}
                                            message={'Please select a group!'}
                                            required={true}
                                            optionAggregate={groupLineOptions}
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

export default UserForm;
