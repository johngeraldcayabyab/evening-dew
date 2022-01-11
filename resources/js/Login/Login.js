import {Button, Card, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {fetchGet} from "../Helpers/fetcher";
import {getCookie} from "../Helpers/cookie";

const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const [loginState, setLoginState] = useState({
        // X-XSRF-TOKEN :
    });

    useEffect(async () => {

        fetchGet(`/sanctum/csrf-cookie`, {}).then(result => {
            console.log(result.headers.get('Set-Cookie'));
            console.log(getCookie('XSRF-TOKEN'));
        });
    }, []);

    return (
        <Card id={'components-form-demo-normal-login'}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </Card>
    )
};

export default Login;
