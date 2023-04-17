import {Button, Input, Modal, Radio, Space, Form, Tooltip} from "antd";
import {useContext, useState} from "react";
import {FormContext} from "../../Contexts/FormContext";
import {WarningOutlined} from "@ant-design/icons"
import Text from "antd/es/typography/Text"

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
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCreateDraftInvoice = () => {
        setIsModalVisible(false);
        formContext.formActions.modalSubmit();
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
                    <Button
                        htmlType={"submit"}
                        type="primary"
                        key="create-draft-invoice"
                        onClick={handleCreateDraftInvoice}
                    >
                        Create Draft Invoice
                    </Button>,
                    <Button key="close" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
                className={'create-invoice-wrapper'}
            >
                <Form.Item name={'invoice_type'}>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={'regular_invoice'}>Regular invoice</Radio>
                            <Radio value={'down_payment_percentage'}>
                                <Tooltip
                                    title={tooltipMessage}
                                >
                                    <Text delete>Down payment (percentage) <WarningOutlined/></Text>
                                </Tooltip>
                                {value === 2 ? (
                                    <>
                                        <Form.Item
                                            label="Down Payment Amount in %"
                                            name="down_payment_amount"
                                            colon={false}
                                            labelWrap={true}
                                        >
                                            <Input disabled={true}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Income Account"
                                            name="income_account_id"
                                            colon={false}
                                            labelWrap={true}
                                        >
                                            <Input disabled={true}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Customer Taxes"
                                            name="customer_taxes"
                                            colon={false}
                                            labelWrap={true}
                                        >
                                            <Input disabled={true}/>
                                        </Form.Item>
                                    </>
                                ) : null}
                            </Radio>
                            <Radio value={'down_payment_fixed'}>
                                <Tooltip
                                    title={tooltipMessage}
                                >
                                    <Text delete>Down payment (fixed amount) <WarningOutlined/></Text>
                                </Tooltip>
                                {value === 3 ? (
                                    <>
                                        <Form.Item
                                            label="Down Payment Amount"
                                            name="down_payment_amount"
                                            colon={false}
                                            labelWrap={true}
                                        >
                                            <Input disabled={true}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Income Account"
                                            name="income_account_id"
                                            colon={false}
                                            labelWrap={true}
                                        >
                                            <Input disabled={true}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Customer Taxes"
                                            name="customer_taxes"
                                            colon={false}
                                            labelWrap={true}
                                        >
                                            <Input disabled={true}/>
                                        </Form.Item>
                                    </>
                                ) : null}
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
            </Modal>
        </div>
    )
};

export default CreateInvoiceButton;
