import {Button, Col, Divider, Image, Modal, Row, Table} from 'antd';
import React, {useContext, useState} from 'react';
import {FormContext} from "../../Contexts/FormContext";
import dayjs from "dayjs";
import html2pdf from 'html2pdf.js'
import PdfLabel from "../../Components/Pdf/PdfLabel";

const TransferPDF = () => {
    const formContext = useContext(FormContext);
    const globalSettings = JSON.parse(localStorage.getItem('globalSettings'));
    const company = globalSettings.hasOwnProperty('company') ? globalSettings.company : null;
    const initialValues = formContext.formState.initialValues;
    const viewableColumns = globalSettings.hasOwnProperty('transfer_lines_pdf_columns_view') ? globalSettings.transfer_lines_pdf_columns_view.split(',') : null;
    const dataSource = initialValues.transfer_lines ? initialValues.transfer_lines.map((transferLine) => {
        const data = {
            product: transferLine.product.name,
            description: transferLine.description,
            demand: transferLine.demand,
            avatar: transferLine.product.avatar
        };
        const filteredData = {key: transferLine.id};
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
                        src={imageSrc}
                    />
                )
            },
            width: '100px'
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            align: 'left',
            width: '100px',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'left',
            width: '350px'
        },
        {
            title: 'QTY',
            dataIndex: 'demand',
            key: 'demand',
            align: 'right',
            width: '30px'
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
        document.querySelector('.ant-modal-header').style.visibility = 'hidden';
        document.querySelector('#head-divider').style.visibility = 'hidden';
        document.querySelector('#order-number-header').style.visibility = 'visible';
        document.querySelector('.ant-modal-close').style.visibility = 'hidden';
        document.querySelector('.ant-modal-footer').style.visibility = 'hidden';
        const opt = {
            margin: .1,
            filename: initialValues.number,
            image: {type: 'jpeg', quality: 0.98},
            html2canvas: {scale: 2},
            jsPDF: {unit: 'in', format: 'b4', orientation: 'portrait'},
            header: []
        };
        html2pdf().set({
            pagebreak: {mode: ['avoid-all', 'css', 'legacy']}
        }).from(input).set(opt).save();
        setTimeout(() => {
            document.querySelector('.ant-modal-close').click();
            document.querySelector('.ant-modal-header').style.visibility = 'visible';
            document.querySelector('#head-divider').style.visibility = 'visible';
            document.querySelector('#order-number-header').style.visibility = 'hidden';
            document.querySelector('.ant-modal-close').style.visibility = 'visible';
            document.querySelector('.ant-modal-footer').style.visibility = 'visible';
        }, 300);
    }


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
                <Divider id={'head-divider'}/>
                <h4 id={'order-number-header'} style={{visibility: 'hidden'}}>ORDER # {initialValues.number}</h4>
                <Row gutter={2}>
                    <Col span={18}>
                        <div style={{
                            display: 'flex',
                            alignContent: 'space-between'
                        }}>
                            <Image
                                width={100}
                                src={company ? company.avatar : '/images/no-image.jpg'}
                            />
                            <div style={{marginLeft: '10px'}}>
                                <PdfLabel label={'Showroom'} value={company?.contact?.address}/>
                                <PdfLabel label={'Tel No'} value={company?.contact?.phone}/>
                                <PdfLabel label={'Mobile'} value={company?.contact?.mobile}/>
                                <PdfLabel label={'Website'} value={company?.contact?.website}/>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <PdfLabel label={'Shipping Date'} value={dateFormat(initialValues.scheduled_date)}/>
                        <PdfLabel label={'Contact Person'} value={initialValues?.responsible?.name}/>
                    </Col>
                </Row>

                <Row gutter={2}>
                    <Col span={24}>
                        <h4 style={{marginLeft: '10px'}}>{company?.name}</h4>
                    </Col>
                </Row>

                <Divider/>

                <Row gutter={2}>
                    <Col span={18}>
                        <PdfLabel label={'Customer'} value={initialValues?.contact?.name}/>
                        {/*<PdfLabel label={'Address'} value={`${initialValues?.delivery_address} ${initialValues?.delivery_city?.name}`}/>*/}
                    </Col>
                    <Col span={6}>
                        <PdfLabel label={'Tel No'} value={initialValues?.contact?.phone}/>
                        <PdfLabel label={'Mobile'} value={initialValues?.contact?.mobile}/>
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
                    </Col>
                </Row>

                <Row gutter={2}>
                    {/*<Col span={24}>*/}
                    {/*    <pre>{initialValues?.terms_and_conditions}</pre>*/}
                    {/*</Col>*/}
                </Row>
                <Row gutter={2}>
                    <Col span={24}>
                        <p>Conforme: ________________________________</p>
                        <p>Print Name / Signature / Date</p>
                    </Col>
                </Row>
            </Modal>
        </>
    )
};

export default TransferPDF;
