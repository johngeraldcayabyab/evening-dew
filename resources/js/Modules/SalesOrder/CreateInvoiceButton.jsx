import {Button, Input, Modal, Radio, Space, Form, Tooltip} from "antd";
import {useContext, useState} from "react";
import {FormContext} from "../../Contexts/FormContext";
import {WarningOutlined} from "@ant-design/icons"

const CreateInvoiceButton = () => {
    const formContext = useContext(FormContext);
    const initialValues = formContext.formState.initialValues;
    const manifest = formContext.manifest;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCreateDraftInvoice = () => {
        setIsModalVisible(false);
    }

    if (initialValues.status !== 'done') {
        return null;
    }

    const tooltipMessage = 'Unsupported as of the moment. When selected, the value will be a regular invoice';

    return (
        <div key={'create-invoice-button'}>
            <Button
                htmlType={"button"}
                type={"ghost"}
                size={'default'}
                onClick={showModal}
            >
                Create Invoice
            </Button>
            <Modal
                title={<b>Create Invoices</b>}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={900}
                footer={[
                    <Button type="primary" key="back" onClick={handleCreateDraftInvoice}>
                        Create Draft Invoice
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
                className={'create-invoice-wrapper'}
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value={1}>Regular invoice</Radio>
                        <Radio value={2}>
                            <Tooltip
                                title={tooltipMessage}
                            >
                                Down payment (percentage) <WarningOutlined/>
                            </Tooltip>
                            {value === 2 ? (
                                <>
                                    <Form.Item
                                        label="Down Payment Amount in %"
                                        name="down_payment_amount"
                                        colon={false}
                                        labelWrap={true}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Income Account"
                                        name="income_account_id"
                                        colon={false}
                                        labelWrap={true}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Customer Taxes"
                                        name="customer_taxes"
                                        colon={false}
                                        labelWrap={true}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </>
                            ) : null}
                        </Radio>
                        <Radio value={3}>
                            <Tooltip
                                title={tooltipMessage}
                            >
                                Down payment (fixed amount) <WarningOutlined/>
                            </Tooltip>
                            {value === 3 ? (
                                <>
                                    <Form.Item
                                        label="Down Payment Amount"
                                        name="down_payment_amount"
                                        colon={false}
                                        labelWrap={true}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Income Account"
                                        name="income_account_id"
                                        colon={false}
                                        labelWrap={true}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Customer Taxes"
                                        name="customer_taxes"
                                        colon={false}
                                        labelWrap={true}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </>
                            ) : null}
                        </Radio>
                    </Space>
                </Radio.Group>
            </Modal>
        </div>
    )
};

export default CreateInvoiceButton;
