import {Button, Card, Checkbox, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useContext, useEffect} from "react";
import {fetchPost} from "../Helpers/fetcher";
import {setCookie} from "../Helpers/cookie";
import {getDevice} from "../Helpers/device";
import {AppContext} from "../components/App";
import {useHistory} from "react-router";
import useFetchHook from "../Hooks/useFetchHook";
import {GET} from "../consts";
import useFetchCatcher from "../Hooks/useFetchCatcher";

const Login = () => {
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
    const history = useHistory();
    const appContext = useContext(AppContext);

    const onFinish = (values) => {
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
        });
    };

    useEffect(() => {
        if (appContext.appState.isLogin) {
            history.push('/');
        }
        useFetch(`/api/sanctum/csrf-cookie`, GET).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
        return () => {
            fetchAbort();
        };
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
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
};

export default Login;
