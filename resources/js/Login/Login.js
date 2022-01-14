import {Button, Card, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {fetchGet, fetchPost} from "../Helpers/fetcher";
import {getCookie} from "../Helpers/cookie";
import {getDevice} from "../Helpers/device";

const Login = () => {
    const [loginState, setLoginState] = useState({
        // X-XSRF-TOKEN :
    });

    const onFinish = (values) => {
        fetchPost(`/api/sanctum/token`, {
            'email': values.email,
            'password': values.password,
            'remember_me': values.remember_me,
            'device_name': 'egg',
        }).then(result => {
            console.log(result);
            // console.log(result.headers.get('Set-Cookie'));
            // console.log(getCookie('XSRF-TOKEN'));
        });
    };

    useEffect(() => {
        fetchGet(`/sanctum/csrf-cookie`).then(() => {
            console.log(getDevice());
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
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
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
