import {Button, Col, Divider, Image, Modal, Row, Space, Table} from 'antd';
import React, {useContext, useState} from 'react';
import {insertDecimal} from "../../Helpers/string";
import FormLabel from "../../Components/Typography/FormLabel";
import {FormContext} from "../../Contexts/FormContext";
import dayjs from "dayjs";
import html2pdf from 'html2pdf.js'

const SalesOrderPDF = () => {
    const formContext = useContext(FormContext);
    const globalSettings = JSON.parse(localStorage.getItem('globalSettings'));
    const currency = globalSettings.hasOwnProperty('currency') ? globalSettings.currency : null;
    const company = globalSettings.hasOwnProperty('company') ? globalSettings.company : null;
    const currencySymbol = `${currency.symbol ? currency.symbol : ''} `;
    const initialValues = formContext.formState.initialValues;
    const viewableColumns = globalSettings.hasOwnProperty('sales_order_lines_pdf_columns_view') ? globalSettings.sales_order_lines_pdf_columns_view.split(',') : null;

    const dataSource = initialValues.sales_order_lines ? initialValues.sales_order_lines.map((salesOrderLine) => {
        const data = {
            product: salesOrderLine.product_name,
            description: salesOrderLine.description,
            quantity: salesOrderLine.quantity,
            unit_price: currencySymbol + insertDecimal(salesOrderLine.unit_price),
            subtotal: currencySymbol + insertDecimal(salesOrderLine.subtotal),
            avatar: salesOrderLine.avatar
        };
        const filteredData = {key: salesOrderLine.id};
        viewableColumns.forEach(viewableColumn => {
            if (data.hasOwnProperty(viewableColumn)) {
                filteredData[viewableColumn] = data[viewableColumn];
            }
        });
        return filteredData
    }) : [];

    const columns = [
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'left',
            width: 200
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
    ];

    const filteredColumns = [];

    columns.forEach(column => {
        if (viewableColumns.includes(column.dataIndex)) {
            filteredColumns.push(column);
        }
    });

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

    function downloadPdfDocument() {
        const input = document.querySelector('.ant-modal-content');
        document.querySelector('.ant-modal-close').style.visibility = 'hidden';
        document.querySelector('.ant-modal-footer').style.visibility = 'hidden';
        const opt = {
            margin: 1,
            filename: 'myfile.pdf',
            image: {type: 'jpeg', quality: 0.98},
            html2canvas: {scale: 2},
            jsPDF: {unit: 'in', format: 'b4', orientation: 'portrait'}
        };
        html2pdf().set({
            pagebreak: {mode: ['avoid-all', 'css', 'legacy']}
        }).from(input).set(opt).save();
        document.querySelector('.ant-modal-close').click();
    }

    const dataSource2 = [
        {
            key: '1',
            label: 'Total:',
            value: `${currencySymbol} ${insertDecimal(initialValues.subtotal)}`,
        },
    ];

    return (
        <>
            <Button type="primary" onClick={showModal}>
                View PDF
            </Button>


            <Modal
                title={<b>ORDER # {initialValues.number}</b>}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}

                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button key={"download"} type={'button'} onClick={downloadPdfDocument}>Download Pdf</Button>
                ]}
            >

                <Row gutter={2}>
                    <Col span={12}>
                        <div className={'image-float-left'}>
                            <Image
                                width={100}
                                src={company ? company.avatar : '/images/no-image.jpg'}
                            />
                        </div>
                        <Space direction="vertical" size={1}>
                            <p style={{marginBottom: '0px'}}><b>COMPANY: {company ? company.name : 'Lorem Ipsum'}</b>
                            </p>
                            <p style={{marginBottom: '0px'}}>
                                <b>MOBILE:</b> {company ? (company.contact.phone ? company.contact.phone : '+123123123123') : '+123123123123'}
                            </p>
                            <p style={{marginBottom: '0px'}}><b>EMAIL:</b> {company ? company.email : 'sample@emai.com'}
                            </p>
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
                            columns={filteredColumns}
                            pagination={false}
                            size={'small'}
                        />

                        <Divider/>

                        <Table
                            style={{width: '300px', float: 'right'}}
                            dataSource={dataSource2}
                            columns={[
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
        </>
    )
};

export default SalesOrderPDF;
