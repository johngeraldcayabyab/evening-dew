import {Button, Col, Divider, Image, Modal, Row, Space, Table} from 'antd';
import React, {useContext, useState} from 'react';
import {insertDecimal} from "../../Helpers/string";
import FormLabel from "../../Components/Typography/FormLabel";
import {FormContext} from "../../Contexts/FormContext";
import dayjs from "dayjs";

const SalesOrderPDF = () => {
    const formContext = useContext(FormContext);
    const globalSettings = JSON.parse(localStorage.getItem('globalSettings'));
    const currency = globalSettings.hasOwnProperty('currency') ? globalSettings.currency : null;
    const company = globalSettings.hasOwnProperty('company') ? globalSettings.company : null;
    console.log(company);
    const currencySymbol = `${currency.symbol ? currency.symbol : ''} `;
    const initialValues = formContext.formState.initialValues;
    const dataSource = initialValues.sales_order_lines ? initialValues.sales_order_lines.map((salesOrderLine) => {
        return {
            key: salesOrderLine.id,
            product: salesOrderLine.product_name,
            quantity: salesOrderLine.quantity,
            unit_price: currencySymbol + insertDecimal(salesOrderLine.unit_price),
            subtotal: currencySymbol + insertDecimal(salesOrderLine.subtotal),
            avatar: salesOrderLine.avatar
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
        if (dayjs(object, 'YYYY-MM-DD').isValid()) {
            return dayjs(object).format('YYYY-MM-DD');
        }
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
                            src= {company ? company.avatar : '/images/no-image.jpg'}
                        />
                    </div>
                    <Space direction="vertical" size={1}>
                        <p style={{marginBottom: '0px'}}><b>Company: {company ? company.name : 'Lorem Ipsum'}</b></p>
                        <p style={{marginBottom: '0px'}}><b>Mobile:</b> {company ? (company.contact.phone ? company.contact.phone : '+123123123123') : '+123123123123'}</p>
                        <p style={{marginBottom: '0px'}}><b>EMAIL:</b> {company ? company.email : 'sample@emai.com'}</p>
                    </Space>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                    <p key={'invoice-date'} style={{marginBottom: '0px'}}><b>INVOICE
                        DATE:</b> {dateFormat(initialValues.quotation_date)}</p>
                    <p key={'shipping-date'} style={{marginBottom: '0px'}}><b>SHIPPING
                        DATE:</b> {dateFormat(initialValues.shipping_date)}</p>
                    {/*<p key={'select-time'} style={{marginBottom: '0px'}}><b>Time:</b> 11:11PM</p>*/}
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
                                title: '',
                                dataIndex: 'avatar',
                                key: 'avatar',
                                render: (data) => {
                                    const imageSrc = data ?? '/images/no-image.jpg';
                                    return (
                                        <Image
                                            width={100}
                                            src={imageSrc}
                                        />
                                    )
                                }
                            },
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
