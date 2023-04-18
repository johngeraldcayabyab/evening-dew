import {Button, Col, Divider, Image, Modal, Row, Space, Table} from 'antd';
import React, {useContext, useState} from 'react';
// import moment from "moment";
import {insertDecimal} from "../../Helpers/string"
import FormLabel from "../../Components/Typography/FormLabel"
import {FormContext} from "../../Contexts/FormContext"

const SalesOrderPDF = () => {
    const formContext = useContext(FormContext);

    const initialValues = formContext.formState.initialValues;
    const dataSource = initialValues.sales_order_lines ? initialValues.sales_order_lines.map((salesOrderLines) => {
        return {
            key: salesOrderLines.id,
            product: salesOrderLines.product.name,
            quantity: salesOrderLines.quantity,
            unit_price: '₱ ' + insertDecimal(salesOrderLines.unit_price),
            subtotal: '₱ ' + insertDecimal(salesOrderLines.subtotal)
        }
    }) : [];

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

    function dateFormat(object) {
        // if (moment(object, 'YYYY-MM-DD').isValid()) {
        //     return moment(object).format('YYYY-MM-DD');
        // }
        return 'test';
    }

    return (<>
        <Button type="primary" onClick={showModal}>
            View PDF
        </Button>

        <Modal
            title={<b>ORDER # {initialValues.number}</b>}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={900}

            footer={[
                <Button key="back" onClick={handleCancel}>
                    Close
                </Button>,
            ]}
        >
            <Row gutter={2}>
                <Col span={12}>
                    <div className={'image-float-left'}>
                        <Image
                            width={100}
                            src="/images/no-image.jpg"
                        />
                    </div>
                    <Space direction="vertical" size={1}>
                        <p style={{marginBottom: '0px'}}><b>COMPANY NAME</b></p>
                        <p style={{marginBottom: '0px'}}><b>SMS/ VIBER:</b> 0912 999 7777</p>
                        <p style={{marginBottom: '0px'}}><b>EMAIL:</b> company@gmail.com</p>
                    </Space>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                    <p key={'invoice-date'} style={{marginBottom: '0px'}}><b>INVOICE
                        DATE:</b> {dateFormat(initialValues.quotation_date)}</p>
                    <p key={'shipping-date'} style={{marginBottom: '0px'}}><b>SHIPPING
                        DATE:</b> {dateFormat(initialValues.shipping_date)}</p>
                    <p key={'select-time'} style={{marginBottom: '0px'}}><b>Time:</b> 11:11PM</p>
                </Col>
            </Row>

            <Divider/>

            <Row gutter={2}>
                <Col span={24}>
                    <Space direction="vertical" size={1}>
                        <p style={{marginBottom: '0px'}}><b>TO:</b></p>
                        <p style={{marginBottom: '0px'}}>
                            <b>{initialValues.customer ? initialValues.customer.name : ''}</b></p>
                        <p style={{marginBottom: '0px'}}>{initialValues.delivery_address} {initialValues.delivery_city ? initialValues.delivery_city.name : ''}</p>
                        <p style={{marginBottom: '0px'}}>{initialValues.customer ? initialValues.customer.phone : ''}</p>
                    </Space>
                </Col>
            </Row>

            <Divider/>

            <Row gutter={2}>
                <Col span={24}>
                    <Table
                        dataSource={dataSource}
                        columns={[
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
                        pagination={false}
                        size={'small'}
                    />

                    <Divider/>

                    <Table style={{width: '300px', float: 'right'}} dataSource={[
                        {
                            key: '1',
                            label: 'Total:',
                            value: `₱ ${insertDecimal(initialValues.subtotal)}`,
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

export default SalesOrderPDF;
