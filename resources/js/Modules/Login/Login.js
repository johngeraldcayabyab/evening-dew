import {Button, Card, Checkbox, Form, Input, message, Spin} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useContext, useEffect, useState} from "react";
import {fetchPost} from "../../Helpers/fetcher";
import {setCookie} from "../../Helpers/cookie";
import {getDevice} from "../../Helpers/device";
import {useHistory} from "react-router";
import {GET} from "../../consts";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {AppContext} from "../../App";
import useFetchHook from "../../Hooks/useFetchHook";

const Login = () => {
    const [state, setState] = useState({
        loading: false,
        errors: {},
    });
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const history = useHistory();
    const appContext = useContext(AppContext);

    const onFinish = (values) => {
        setState(prevState => ({
            ...prevState,
            loading: true,
        }));
        fetchPost(`/api/sanctum/token`, {
            'email': values.email,
            'password': values.password,
            'remember_me': values.remember_me,
            'device_name': getDevice(),
        }).then((response) => {
            return response.text();
        }).then((text) => {
            message.success('Welcome back!');
            setCookie('Authorization', `Bearer ${text}`, 365);
            appContext.setAppState((state) => ({
                ...state,
                isLogin: true,
            }));
            history.push('/');
        }).catch(error => {
            fetchCatcher.get(error).then((errors) => {
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                    errors: errors
                }));
            });
        });
    };

    useEffect(() => {
        if (appContext.appState.isLogin) {
            history.push('/');
        }
        useFetch(`/api/sanctum/csrf-cookie`, GET).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }, []);

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
