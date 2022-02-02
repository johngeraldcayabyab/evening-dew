import React, {useState} from 'react';
import {message, Upload} from 'antd';
import {Form} from "antd";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import FormLabel from "../Typography/FormLabel";

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


const FormItemUpload = (props) => {
    const [state, setState] = useState({
        loading: false,
    });

    function handleChange(info) {
        if (info.file.status === 'uploading') {
            setState((...prevState) => ({
                ...prevState,
                loading: true
            }));
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl) => {
                setState((...prevState) => ({
                    ...prevState,
                    imageUrl,
                    loading: false,
                }));
            });
        }
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
            <Upload
                name={props.name}
                listType="picture-card"
                showUploadList={false}
                action="/api/uploads/images"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                className={'form-item-upload'}
                disabled={props.formDisabled}
            >
                {state.imageUrl ? <img src={state.imageUrl} alt="avatar" style={{maxWidth: '100%', maxHeight: '100%'}}/> :
                    <div>
                        {state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
                        <div style={{marginTop: 8}}>Upload</div>
                    </div>
                }
            </Upload>
        </Form.Item>
    )
};

export default FormItemUpload;
