import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, message, Popover, Upload} from 'antd';
import {DeleteOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import FormLabel from "../Typography/FormLabel";
import {objectHasValue} from "../../Helpers/object";
import {getCookie} from "../../Helpers/cookie";
import {FormContext} from "../../Contexts/FormContext";


const FormItemUpload = (props) => {
    const formContext = useContext(FormContext);
    const [state, setState] = useState({
        imageUrl: null,
        loading: false,
    });

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                imageUrl: objectHasValue(props.initialValues) && props.initialValues.avatar ? props.initialValues.avatar : null
            };
        });
    }, [props.initialValues, props.formDisabled]);

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    function handleChange(info) {
        if (info.file.status === 'uploading') {
            setState((...prevState) => ({
                ...prevState,
                loading: true
            }));
            return;
        }
        if (info.file.status === 'done') {
            let fields = {};
            fields[props.name] = info.file.response.name;
            props.form.setFieldsValue(fields);
            getBase64(info.file.originFileObj, (imageUrl) => {
                setState((...prevState) => ({
                    ...prevState,
                    imageUrl,
                    loading: false,
                }));
            });
        }
    }

    function removeImage() {
        let fields = {};
        fields[props.name] = null;
        props.form.setFieldsValue(fields);
        setState((prevState) => {
            return {
                ...prevState,
                imageUrl: null
            };
        });
    }

    return (
        <Form.Item
            label={<FormLabel/>}
            name={props.name}
            rules={[{required: props.required, message: props.message}]}
            colon={false}
            labelCol={{span: 20}}
            wrapperCol={{span: 4}}
        >
            <PopoverImage
                formDisabled={props.formDisabled}
                imageUrl={state.imageUrl}
                content={<Button onClick={removeImage}>Remove</Button>}
            >
                <Upload
                    name={props.name}
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/uploads/images"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    className={'form-item-upload'}
                    disabled={props.formDisabled}
                    headers={{
                        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                        'Authorization': getCookie('Authorization')
                    }}
                >
                    {
                        props.formDisabled ?
                            <Image
                                src={objectHasValue(props.initialValues) && props.initialValues.avatar ? props.initialValues.avatar : '/images/no-image.jpg'}
                                alt="avatar"
                                style={{maxWidth: '100%', maxHeight: '100%'}}
                                preview={!!(objectHasValue(props.initialValues) && props.initialValues.avatar)}
                            /> : state.imageUrl ?
                                <>
                                    <Image
                                        src={state.imageUrl} alt="avatar" style={{maxWidth: '100%', maxHeight: '100%'}}
                                        preview={false}
                                    />
                                    <DeleteOutlined style={{position: 'absolute', color: '#fff'}}/>
                                </> :
                                <div>
                                    {state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
                                    <div style={{marginTop: 8}}>Upload</div>
                                </div>
                    }
                </Upload>
            </PopoverImage>
        </Form.Item>
    )
};

const PopoverImage = (props) => {
    if (!props.formDisabled && props.imageUrl) {
        return (
            <Popover content={props.content}>{props.children}</Popover>
        )
    } else {
        return (
            <>{props.children}</>
        )
    }
};


export default FormItemUpload;
