import {Button, Card, Checkbox, Form, Input, message, Spin} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useContext, useEffect, useState} from "react";
import {setCookie} from "../../Helpers/cookie";
import {getDevice} from "../../Helpers/device";
import {useNavigate} from "react-router-dom";
import {GET, POST} from "../../consts";
import useFetchHook from "../../Hooks/useFetchHook";
import {AppContext} from "../../Contexts/AppContext"

const Login = () => {
    const [state, setState] = useState({
        loading: false,
        errors: {},
    });
    const useFetch = useFetchHook();
    const navigate = useNavigate();
    const appContext = useContext(AppContext);

    const onFinish = (values) => {
        setState(prevState => ({
            ...prevState,
            loading: true,
        }));
        useFetch(`/api/sanctum/token`, POST, {
            'email': values.email,
            'password': values.password,
            'remember_me': values.remember_me,
            'device_name': getDevice(),
        }).then((responseText) => {
            message.success('Welcome back!');
            const authorization = `Bearer ${responseText}`
            setCookie('Authorization', authorization, 365);
            setCookie('userEmail', values.email);
            appContext.setAppState(prevState => ({
                ...prevState,
                isLogin: authorization,
                userEmail: values.email,
            }));
        }).catch((errors) => {
            errors.json().then((error) => {
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                    errors: error.errors
                }));
            });
        });
    };

    useEffect(() => {
        if (appContext.appState.isLogin) {
            navigate('/contacts');
        }
        useFetch(`/api/sanctum/csrf-cookie`, GET);
    }, [appContext.appState.isLogin]);

    return (
        <Spin spinning={state.loading}>
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
                        validateStatus={state.errors['email'] ? 'error' : null}
                        help={state.errors['email'] ? state.errors['email'] : null}
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
                        validateStatus={state.errors['password'] ? 'error' : null}
                        help={state.errors['password'] ? state.errors['password'] : null}
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
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </Spin>
    )
};

export default Login;
