import {Column} from "@ant-design/charts";
import ControlPanel from "../../Components/ControlPanel";
import {Link} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import {useEffect, useState} from "react";
import useFetchHook from "../../Hooks/useFetchHook";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET} from "../../consts";
import {Card, Col, Row} from "antd";

const Home = () => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    const [state, setState] = useState({
        salesPerDayLoading: true,
        salesPerDay: [],
    });

    useEffect(() => {
        useFetch(`/api/sales_orders/sales_per_day`, GET).then((response) => {
            const salesPerDay = response.map((sales) => ({
                time: sales.time,
                total: parseInt(sales.total)
            }));
            console.log(salesPerDay);
            setState((prevState) => ({
                ...prevState,
                salesPerDay: salesPerDay,
                salesPerDayLoading: false,
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }, []);

    const config = {
        data: state.salesPerDay,
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

    return (
        <>
            <ControlPanel
                topColOneLeft={
                    <Title level={5} style={{display: 'inline-block'}}>
                        <Link to={'/home'}>
                            Home
                        </Link>
                    </Title>
                }
            />

            <Row align={'middle'} style={{marginTop: '15px'}}>
                <Col span={12}>
                    <Card
                        title="Sales Per Day"
                        style={{margin: '5%', padding: '15px'}}
                    >
                        <Column {...config} />
                    </Card>
                </Col>
                <Col span={12}>

                </Col>
            </Row>


        </>
    );
};

export default Home;
