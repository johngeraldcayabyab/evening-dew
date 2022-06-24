import {Column} from "@ant-design/charts";
import ControlPanel from "../../Components/ControlPanel";
import {Link} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import {useEffect, useState} from "react";
import useFetchHook from "../../Hooks/useFetchHook";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET} from "../../consts";
import {Card, Col, DatePicker, Row, Spin} from "antd";
import moment from "moment";

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const Home = () => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    const [state, setState] = useState({
        shopifySalesLoading: true,
        shopifySales: [],
        shopifySalesFrom: moment().subtract(7, 'days'),
        shopifySalesTo: moment(),

        manualSalesLoading: true,
        manualSales: [],
        manualSalesFrom: moment().subtract(7, 'days'),
        manualSalesTo: moment(),

        allSalesLoading: true,
        allSales: [],
        allSalesFrom: moment().subtract(7, 'days'),
        allSalesTo: moment(),
    });

    useEffect(() => {
        const from = moment().subtract(7, 'days');
        const to = moment();
        fetchShopifySales(from, to);
        fetchManualSales(from, to);
        fetchAllSales(from, to);
    }, []);

    function fetchShopifySales(from, to) {
        useFetch(`/api/sales_orders/sales_per_day`, GET, {
            from: from.format(dateFormat),
            to: to.format(dateFormat),
            source_id: 1,
        }).then((response) => {
            const sales = response.map((sales) => ({
                time: sales.time,
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

    function fetchManualSales(from, to) {
        useFetch(`/api/sales_orders/sales_per_day`, GET, {
            from: from.format(dateFormat),
            to: to.format(dateFormat),
            source_id: 2,
        }).then((response) => {
            const sales = response.map((sales) => ({
                time: sales.time,
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

    function fetchAllSales(from, to) {
        useFetch(`/api/sales_orders/sales_per_day`, GET, {
            from: from.format(dateFormat),
            to: to.format(dateFormat),
        }).then((response) => {
            const sales = response.map((sales) => ({
                time: sales.time,
                total: parseInt(sales.total)
            }));
            setState((prevState) => ({
                ...prevState,
                allSales: sales,
                allSalesLoading: false,
                allSalesFrom: from,
                allSalesTo: to
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    const shopifySalesConfig = {
        data: state.shopifySales,
        xField: 'time',
        yField: 'total',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            time: {
                alias: 'Time',
            },
            total: {
                alias: 'Total',
            },
        },
    };

    const manualSalesConfig = {
        data: state.manualSales,
        xField: 'time',
        yField: 'total',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            time: {
                alias: 'Time',
            },
            total: {
                alias: 'Total',
            },
        },
    };

    const allSalesConfig = {
        data: state.allSales,
        xField: 'time',
        yField: 'total',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            time: {
                alias: 'Time',
            },
            total: {
                alias: 'Total',
            },
        },
    };

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
                        />
                    }
                    style={{margin: '5%', padding: '15px'}}
                >
                    <Spin spinning={state.shopifySalesLoading}>
                        <Column {...shopifySalesConfig} />
                    </Spin>
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
                        />
                    }
                    style={{margin: '5%', padding: '15px'}}
                >
                    <Spin spinning={state.manualSalesLoading}>
                        <Column {...manualSalesConfig} />
                    </Spin>
                </Card>
            </Col>
        </Row>


        <Row align={'middle'} style={{marginTop: '15px'}}>
            <Col
                xs={{span: 24}}
                sm={{span: 24}}
                md={{span: 24}}
                lg={{span: 16, offset: 4}}
            >
                <Card
                    title={"All Sales"}
                    extra={
                        <
                            RangePicker
                            onChange={e => {
                                fetchAllSales(moment(e[0]), moment(e[1]));
                            }}
                            allowClear={false}
                            style={{marginBottom: 8, width: '100%'}}
                            defaultValue={[state.allSalesFrom, state.allSalesTo]}
                        />
                    }
                    style={{margin: '5%', padding: '15px'}}
                >
                    <Spin spinning={state.allSalesLoading}>
                        <Column {...allSalesConfig} />
                    </Spin>
                </Card>
            </Col>
        </Row>
    </>);
};

export default Home;
