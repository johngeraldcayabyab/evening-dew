import React, {useState} from 'react';
import {message, Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';

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


const FormItemUpload = () => {
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
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="api/uploads/images"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {state.imageUrl ? <img src={state.imageUrl} alt="avatar" style={{width: '100%'}}/> :
                <div>
                    {state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
                    <div style={{marginTop: 8}}>Upload</div>
                </div>
            }
        </Upload>
    )
};

export default FormItemUpload;
