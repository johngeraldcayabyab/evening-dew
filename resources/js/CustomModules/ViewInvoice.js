import {Button, Col, Descriptions, Divider, Image, Modal, Row, Space, Table} from 'antd';
import React, {useContext, useState} from 'react';
import {FormContext} from "../Contexts/FormContext";
import Title from "antd/lib/typography/Title";
import FormLabel from "../Components/Typography/FormLabel";

const ViewInvoice = () => {
    const formContext = useContext(FormContext);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (<>
        <Button type="primary" onClick={showModal}>
            Open Modal
        </Button>

        <Modal
            title="Invoice INV0153"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={900}

            footer={[
                <Button key="back" onClick={handleCancel}>
                    Close
                </Button>,
            ]}
        >
            {/*<Title level={4} style={{textAlign: "right", marginBottom: '30px'}}>Invoice INV0153</Title>*/}

            <Row gutter={2}>
                <Col span={12}>
                    <div className={'image-float-left'}>
                        <Image
                            width={100}
                            src="/images/invoice-logo.png"
                        />
                    </div>
                    <Space direction="vertical" size={1}>
                        <p style={{marginBottom: '0px'}}><b>TASTE AND TELL MNL</b></p>
                        <p style={{marginBottom: '0px'}}><b>SMS/ VIBER:</b> 0909 982 7426</p>
                        <p style={{marginBottom: '0px'}}><b>EMAIL:</b> tasteandtellmnla@gmail.com</p>
                    </Space>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                    <p style={{marginBottom: '0px'}}><b>INVOICE DATE</b> Jul 9, 2020</p>
                </Col>
            </Row>

            <Divider/>

            <Row gutter={2}>
                <Col span={24}>
                    <Space direction="vertical" size={1}>
                        <p style={{marginBottom: '0px'}}>TO:</p>
                        <p style={{marginBottom: '0px'}}><b>Mariell Chuateco</b></p>
                        <p style={{marginBottom: '0px'}}>1272 Acacia St Dasmarinas Village Makati City</p>
                        <p style={{marginBottom: '0px'}}>+639178625525</p>
                    </Space>
                </Col>
            </Row>

            <Divider/>

            <Row gutter={2}>
                <Col span={24}>
                    <Table dataSource={[
                        {
                            key: '1',
                            product: 'Delivery Fee',
                            quantity: '1',
                            unit_price: '₱ 120.00',
                            subtotal: '₱ 120.00'
                        },
                        {
                            key: '1',
                            product: 'ScollopxSalmon Medium Spicy',
                            quantity: '1',
                            unit_price: '₱ 2050.00',
                            subtotal: '₱ 2050.00'
                        },
                        {
                            key: '1',
                            product: 'ScollopxSalmon Small Spicy',
                            quantity: '1',
                            unit_price: '₱ 1600.00',
                            subtotal: '₱ 1600.00'
                        },
                    ]} columns={[
                        {
                            title: 'Product',
                            dataIndex: 'product',
                            key: 'product',
                            align: 'left',
                        },
                        {
                            title: 'Quantity',
                            dataIndex: 'quantity',
                            key: 'quantity',
                            align: 'right',
                        },
                        {
                            title: 'Unit Price',
                            dataIndex: 'unit_price',
                            key: 'unit_price',
                            align: 'right',
                        },
                        {
                            title: 'Subtotal',
                            dataIndex: 'subtotal',
                            key: 'subtotal',
                            align: 'right',
                        },
                    ]}
                        // showHeader={false}
                           pagination={false}
                           size={'small'}
                    />

                    <Divider/>

                    <Table style={{width: '300px', float: 'right'}} dataSource={[
                        {
                            key: '1',
                            label: 'Total:',
                            value: '₱ 3770.00',
                        },
                    ]} columns={[
                        {
                            title: 'Label',
                            dataIndex: 'label',
                            key: 'label',
                            align: 'right',
                            render: (text, record) => {
                                return (<FormLabel>{text}</FormLabel>)
                            }
                        },
                        {
                            title: 'Value',
                            dataIndex: 'value',
                            key: 'value',
                            align: 'right',
                        },
                    ]}
                           showHeader={false}
                           pagination={false}
                           size={'small'}
                    />
                </Col>
            </Row>
        </Modal>

    </>)
};

export default ViewInvoice;
