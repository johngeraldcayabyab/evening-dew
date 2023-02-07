import {Column} from "@ant-design/charts";
import ControlPanel from "../../Components/ControlPanel";
import {Link} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import {useEffect, useState} from "react";
import useFetchHook from "../../Hooks/useFetchHook";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET, SEARCH} from "../../consts";
import {Card, Col, DatePicker, Row, Spin, Radio, Table} from "antd";
import moment from "moment";
import Text from "antd/es/typography/Text";
import {numberWithCommas} from "../../Helpers/string";

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const Home = () => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    const [state, setState] = useState({
        shopifySalesLoading: true,
        shopifySales: [],
        shopifySalesFrom: moment().subtract(7, 'months'),
        shopifySalesTo: moment(),
        shopifyPicker: 'month',

        manualSalesLoading: true,
        manualSales: [],
        manualSalesFrom: moment().subtract(7, 'months'),
        manualSalesTo: moment(),
        manualPicker: 'month',

        smNorthSalesLoading: true,
        smNorthSales: [],
        smNorthSalesFrom: moment().subtract(7, 'months'),
        smNorthSalesTo: moment(),
        smNorthPicker: 'month',

        // allSalesLoading: true,
        // allSales: [],
        // allSalesFrom: moment().subtract(7, 'months'),
        // allSalesTo: moment(),
        // allSalesPicker: 'month',
    });

    useEffect(() => {
        const from = moment().subtract(7, 'months');
        const to = moment();
        fetchShopifySales(from, to);
        fetchManualSales(from, to);
        fetchSmNorthSales(from, to);
        // fetchAllSales(from, to);
    }, []);

    function fetchSmNorthSales(from, to, dateUnit = false) {
        useFetch(`/api/sales_orders/sales_per_day`, GET, {
            from: from.format(dateFormat),
            to: to.format(dateFormat),
            source_id: 6,
            date_unit: dateUnit ? dateUnit : state.smNorthPicker
        }).then((response) => {
            const sales = response.map((sales) => ({
                ...sales,
                total: parseInt(sales.total)
            }));
            setState((prevState) => ({
                ...prevState,
                smNorthSales: sales,
                smNorthSalesLoading: false,
                smNorthSalesFrom: from,
                smNorthSalesTo: to
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    function fetchShopifySales(from, to, dateUnit = false) {
        useFetch(`/api/sales_orders/sales_per_day`, GET, {
            from: from.format(dateFormat),
            to: to.format(dateFormat),
            source_id: 1,
            date_unit: dateUnit ? dateUnit : state.shopifyPicker
        }).then((response) => {
            const sales = response.map((sales) => ({
                ...sales,
                total: parseInt(sales.total)
            }));
            setState((prevState) => ({
                ...prevState,
                shopifySales: sales,
                shopifySalesLoading: false,
                shopifySalesFrom: from,
                shopifySalesTo: to
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    function fetchManualSales(from, to, dateUnit = false) {
        useFetch(`/api/sales_orders/sales_per_day`, GET, {
            from: from.format(dateFormat),
            to: to.format(dateFormat),
            source_id: 2,
            date_unit: dateUnit ? dateUnit : state.manualPicker
        }).then((response) => {
            const sales = response.map((sales) => ({
                ...sales,
                total: parseInt(sales.total)
            }));
            setState((prevState) => ({
                ...prevState,
                manualSales: sales,
                manualSalesLoading: false,
                manualSalesFrom: from,
                manualSalesTo: to
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    // function fetchAllSales(from, to) {
    //     useFetch(`/api/sales_orders/sales_per_day`, GET, {
    //         from: from.format(dateFormat),
    //         to: to.format(dateFormat),
    //     }).then((response) => {
    //         const sales = response.map((sales) => ({
    //             time: sales.time,
    //             total: parseInt(sales.total)
    //         }));
    //         setState((prevState) => ({
    //             ...prevState,
    //             allSales: sales,
    //             allSalesLoading: false,
    //             allSalesFrom: from,
    //             allSalesTo: to
    //         }));
    //     }).catch((responseErr) => {
    //         fetchCatcher.get(responseErr);
    //     });
    // }

    // const shopifySalesConfig = {
    //     data: state.shopifySales,
    //     xField: 'time',
    //     yField: 'total',
    //     label: {
    //         position: 'middle',
    //         style: {
    //             fill: '#FFFFFF',
    //             opacity: 0.6,
    //         },
    //     },
    //     xAxis: {
    //         label: {
    //             autoHide: true,
    //             autoRotate: false,
    //         },
    //     },
    //     meta: {
    //         time: {
    //             alias: 'Time',
    //         },
    //         total: {
    //             alias: 'Total',
    //         },
    //     },
    // };

    // const manualSalesConfig = {
    //     data: state.manualSales,
    //     xField: 'time',
    //     yField: 'total',
    //     label: {
    //         position: 'middle',
    //         style: {
    //             fill: '#FFFFFF',
    //             opacity: 0.6,
    //         },
    //     },
    //     xAxis: {
    //         label: {
    //             autoHide: true,
    //             autoRotate: false,
    //         },
    //     },
    //     meta: {
    //         time: {
    //             alias: 'Time',
    //         },
    //         total: {
    //             alias: 'Total',
    //         },
    //     },
    // };

    // const allSalesConfig = {
    //     data: state.allSales,
    //     xField: 'time',
    //     yField: 'total',
    //     label: {
    //         position: 'middle',
    //         style: {
    //             fill: '#FFFFFF',
    //             opacity: 0.6,
    //         },
    //     },
    //     xAxis: {
    //         label: {
    //             autoHide: true,
    //             autoRotate: false,
    //         },
    //     },
    //     meta: {
    //         time: {
    //             alias: 'Time',
    //         },
    //         total: {
    //             alias: 'Total',
    //         },
    //     },
    // };

    function setShopifyPicker(value) {
        let dateUnit;
        let dateAmount;
        if (value === 'date') {
            dateUnit = 'days';
            dateAmount = 7;
        } else if (value === 'month') {
            dateUnit = 'months';
            dateAmount = 7;
        } else if (value === 'year') {
            dateUnit = 'years';
            dateAmount = 3;
        }

        const from = moment().subtract(dateAmount, dateUnit);
        const to = moment();
        setState((prevState) => ({
            ...prevState,
            shopifyPicker: value,
            shopifySalesFrom: from,
        }));

        fetchShopifySales(from, to, value);
    }


    function setManualPicker(value) {
        let dateUnit;
        let dateAmount;
        if (value === 'date') {
            dateUnit = 'days';
            dateAmount = 7;
        } else if (value === 'month') {
            dateUnit = 'months';
            dateAmount = 7;
        } else if (value === 'year') {
            dateUnit = 'years';
            dateAmount = 3;
        }

        const from = moment().subtract(dateAmount, dateUnit);
        const to = moment();
        setState((prevState) => ({
            ...prevState,
            manualPicker: value,
            shopifySalesFrom: from,
        }));

        fetchManualSales(from, to, value);
    }

    function setSmNorthPicker(value) {
        let dateUnit;
        let dateAmount;
        if (value === 'date') {
            dateUnit = 'days';
            dateAmount = 7;
        } else if (value === 'month') {
            dateUnit = 'months';
            dateAmount = 7;
        } else if (value === 'year') {
            dateUnit = 'years';
            dateAmount = 3;
        }

        const from = moment().subtract(dateAmount, dateUnit);
        const to = moment();
        setState((prevState) => ({
            ...prevState,
            smNorthPicker: value,
            smNorthSalesFrom: from,
        }));

        fetchSmNorthSales(from, to, value);
    }

    return (<>
        <ControlPanel
            topColOneLeft={<Title level={5} style={{display: 'inline-block'}}>
                <Link to={'/home'}>
                    Home
                </Link>
            </Title>}
        />
        <Row align={'middle'} style={{marginTop: '15px'}}>
            <Col
                xs={{span: 24}}
                sm={{span: 24}}
                md={{span: 24}}
                lg={{span: 12}}
            >
                <Card
                    title={"Shopify Sales"}
                    extra={
                        <RangePicker
                            onChange={e => {
                                fetchShopifySales(moment(e[0]), moment(e[1]));
                            }}
                            allowClear={false}
                            style={{marginBottom: 8, width: '100%'}}
                            defaultValue={[state.shopifySalesFrom, state.shopifySalesTo]}
                            picker={state.shopifyPicker}
                        />
                    }
                    style={{margin: '5%', padding: '15px'}}
                >
                    <Radio.Group
                        value={state.shopifyPicker}
                        onChange={e => {
                            setShopifyPicker(e.target.value);
                        }}
                    >
                        <Radio.Button value="date">Day</Radio.Button>
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>


                    <Table
                        loading={state.shopifySalesLoading}
                        dataSource={state.shopifySales}
                        columns={[
                            {
                                title: 'Date',
                                dataIndex: 'year',
                                key: 'year',
                                render: (text, record) => {
                                    if (record.month) {
                                        const month = String(record.month).length === 1 ? `0${record.month}` : record.month;
                                        return `${record.year}-${month}`;
                                    }
                                    return record.year;
                                }
                            },
                            {
                                title: 'Total',
                                dataIndex: 'total',
                                key: 'total',
                                render: (text, record) => {
                                    return numberWithCommas(record.total)
                                }
                            }
                            ,
                        ]}
                        rowKey={'total'}
                        pagination={false}
                        size={'small'}
                    />

                    {/*<Spin spinning={state.shopifySalesLoading}>*/}
                    {/*    <Column {...shopifySalesConfig} />*/}
                    {/*</Spin>*/}
                </Card>
            </Col>

            <Col
                xs={{span: 24}}
                sm={{span: 24}}
                md={{span: 24}}
                lg={{span: 12}}
            >
                <Card
                    title={"Manual Sales"}
                    extra={
                        <RangePicker
                            onChange={e => {
                                fetchManualSales(moment(e[0]), moment(e[1]));
                            }}
                            allowClear={false}
                            style={{marginBottom: 8, width: '100%'}}
                            defaultValue={[state.manualSalesFrom, state.manualSalesTo]}
                            picker={state.manualPicker}
                        />
                    }
                    style={{margin: '5%', padding: '15px'}}
                >
                    <Radio.Group
                        value={state.manualPicker}
                        onChange={e => {
                            setManualPicker(e.target.value);
                        }}
                    >
                        <Radio.Button value="date">Day</Radio.Button>
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>


                    <Table
                        loading={state.manualSalesLoading}
                        dataSource={state.manualSales}
                        columns={[
                            {
                                title: 'Date',
                                dataIndex: 'year',
                                key: 'year',
                                render: (text, record) => {
                                    if (record.month) {
                                        const month = String(record.month).length === 1 ? `0${record.month}` : record.month;
                                        return `${record.year}-${month}`;
                                    }
                                    return record.year;
                                }
                            },
                            {
                                title: 'Total',
                                dataIndex: 'total',
                                key: 'total',
                                render: (text, record) => {
                                    return numberWithCommas(record.total)
                                }
                            }
                            ,
                        ]}
                        rowKey={'total'}
                        pagination={false}
                        size={'small'}
                    />


                    {/*<Spin spinning={state.manualSalesLoading}>*/}
                    {/*    <Column {...manualSalesConfig} />*/}
                    {/*</Spin>*/}
                </Card>
            </Col>
        </Row>


        <Row align={'middle'} style={{marginTop: '15px'}}>
            <Col
                xs={{span: 24}}
                sm={{span: 24}}
                md={{span: 24}}
                lg={{span: 12}}
            >
                <Card
                    title={"SM North"}
                    extra={
                        <RangePicker
                            onChange={e => {
                                fetchSmNorthSales(moment(e[0]), moment(e[1]));
                            }}
                            allowClear={false}
                            style={{marginBottom: 8, width: '100%'}}
                            defaultValue={[state.smNorthSalesFrom, state.smNorthSalesTo]}
                            picker={state.smNorthPicker}
                        />
                    }
                    style={{margin: '5%', padding: '15px'}}
                >
                    <Radio.Group
                        value={state.smNorthPicker}
                        onChange={e => {
                            setSmNorthPicker(e.target.value);
                        }}
                    >
                        <Radio.Button value="date">Day</Radio.Button>
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>


                    <Table
                        loading={state.smNorthSalesLoading}
                        dataSource={state.smNorthSales}
                        columns={[
                            {
                                title: 'Date',
                                dataIndex: 'year',
                                key: 'year',
                                render: (text, record) => {
                                    if (record.month) {
                                        const month = String(record.month).length === 1 ? `0${record.month}` : record.month;
                                        return `${record.year}-${month}`;
                                    }
                                    return record.year;
                                }
                            },
                            {
                                title: 'Total',
                                dataIndex: 'total',
                                key: 'total',
                                render: (text, record) => {
                                    return numberWithCommas(record.total)
                                }
                            }
                            ,
                        ]}
                        rowKey={'total'}
                        pagination={false}
                        size={'small'}
                    />

                    {/*<Spin spinning={state.shopifySalesLoading}>*/}
                    {/*    <Column {...shopifySalesConfig} />*/}
                    {/*</Spin>*/}
                </Card>
            </Col>

            {/*<Col*/}
            {/*    xs={{span: 24}}*/}
            {/*    sm={{span: 24}}*/}
            {/*    md={{span: 24}}*/}
            {/*    lg={{span: 12}}*/}
            {/*>*/}
            {/*    <Card*/}
            {/*        title={"Manual Sales"}*/}
            {/*        extra={*/}
            {/*            <RangePicker*/}
            {/*                onChange={e => {*/}
            {/*                    fetchManualSales(moment(e[0]), moment(e[1]));*/}
            {/*                }}*/}
            {/*                allowClear={false}*/}
            {/*                style={{marginBottom: 8, width: '100%'}}*/}
            {/*                defaultValue={[state.manualSalesFrom, state.manualSalesTo]}*/}
            {/*                picker={state.manualPicker}*/}
            {/*            />*/}
            {/*        }*/}
            {/*        style={{margin: '5%', padding: '15px'}}*/}
            {/*    >*/}
            {/*        <Radio.Group*/}
            {/*            value={state.manualPicker}*/}
            {/*            onChange={e => {*/}
            {/*                setManualPicker(e.target.value);*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <Radio.Button value="date">Day</Radio.Button>*/}
            {/*            <Radio.Button value="month">Month</Radio.Button>*/}
            {/*            <Radio.Button value="year">Year</Radio.Button>*/}
            {/*        </Radio.Group>*/}


            {/*        <Table*/}
            {/*            loading={state.manualSalesLoading}*/}
            {/*            dataSource={state.manualSales}*/}
            {/*            columns={[*/}
            {/*                {*/}
            {/*                    title: 'Date',*/}
            {/*                    dataIndex: 'year',*/}
            {/*                    key: 'year',*/}
            {/*                    render: (text, record) => {*/}
            {/*                        if (record.month) {*/}
            {/*                            const month = String(record.month).length === 1 ? `0${record.month}` : record.month;*/}
            {/*                            return `${record.year}-${month}`;*/}
            {/*                        }*/}
            {/*                        return record.year;*/}
            {/*                    }*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    title: 'Total',*/}
            {/*                    dataIndex: 'total',*/}
            {/*                    key: 'total',*/}
            {/*                    render: (text, record) => {*/}
            {/*                        return numberWithCommas(record.total)*/}
            {/*                    }*/}
            {/*                }*/}
            {/*                ,*/}
            {/*            ]}*/}
            {/*            rowKey={'total'}*/}
            {/*            pagination={false}*/}
            {/*            size={'small'}*/}
            {/*        />*/}


            {/*        /!*<Spin spinning={state.manualSalesLoading}>*!/*/}
            {/*        /!*    <Column {...manualSalesConfig} />*!/*/}
            {/*        /!*</Spin>*!/*/}
            {/*    </Card>*/}
            {/*</Col>*/}
        </Row>

        {/*<Row align={'middle'} style={{marginTop: '15px'}}>*/}
        {/*    <Col*/}
        {/*        xs={{span: 24}}*/}
        {/*        sm={{span: 24}}*/}
        {/*        md={{span: 24}}*/}
        {/*        lg={{span: 16, offset: 4}}*/}
        {/*    >*/}
        {/*        <Card*/}
        {/*            title={"All Sales"}*/}
        {/*            extra={*/}
        {/*                <*/}
        {/*                    RangePicker*/}
        {/*                    onChange={e => {*/}
        {/*                        fetchAllSales(moment(e[0]), moment(e[1]));*/}
        {/*                    }}*/}
        {/*                    allowClear={false}*/}
        {/*                    style={{marginBottom: 8, width: '100%'}}*/}
        {/*                    defaultValue={[state.allSalesFrom, state.allSalesTo]}*/}
        {/*                    picker={state.allSalesPicker}*/}
        {/*                />*/}
        {/*            }*/}
        {/*            style={{margin: '5%', padding: '15px'}}*/}
        {/*        >*/}
        {/*            <Spin spinning={state.allSalesLoading}>*/}
        {/*                <Column {...allSalesConfig} />*/}
        {/*            </Spin>*/}
        {/*        </Card>*/}
        {/*    </Col>*/}
        {/*</Row>*/}
    </>);
};

export default Home;
