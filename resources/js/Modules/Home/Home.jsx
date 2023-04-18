// import {Column} from "@ant-design/charts";
import ControlPanel from "../../Components/ControlPanel";
import {Link} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import {useEffect, useState} from "react";
import useFetchHook from "../../Hooks/useFetchHook";
import {GET} from "../../consts";
import {Card, Col, DatePicker, Row, Spin} from "antd";
// import moment from "moment";

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const Home = () => {
    return 'Homey';
    // const useFetch = useFetchHook();
    //
    // const [state, setState] = useState({
    //     salesPerDayLoading: true,
    //     salesPerDay: [],
    //     from: moment().subtract(7, 'days'),
    //     to: moment(),
    // });
    //
    // useEffect(() => {
    //     const from = moment().subtract(7, 'days');
    //     const to = moment();
    //     fetchSalesPerDay(from, to);
    // }, []);
    //
    // function fetchSalesPerDay(from, to) {
    //     useFetch(`/api/sales_orders/sales_per_day`, GET, {
    //         from: from.format(dateFormat),
    //         to: to.format(dateFormat),
    //     }).then((response) => {
    //         const salesPerDay = response.map((sales) => ({
    //             time: sales.time,
    //             total: parseInt(sales.total)
    //         }));
    //         setState((prevState) => ({
    //             ...prevState,
    //             salesPerDay: salesPerDay,
    //             salesPerDayLoading: false,
    //             from: from,
    //             to: to
    //         }));
    //     });
    // }
    //
    // const config = {
    //     data: state.salesPerDay,
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
    //
    // return (
    //     <>
    //         <ControlPanel
    //             topColOneLeft={
    //                 <Title level={5} style={{display: 'inline-block'}}>
    //                     <Link to={'/home'}>
    //                         Home
    //                     </Link>
    //                 </Title>
    //             }
    //         />
    //         <Row align={'middle'} style={{marginTop: '15px'}}>
    //             <Col
    //                 xs={{span: 24}}
    //                 sm={{span: 24}}
    //                 md={{span: 24}}
    //                 lg={{span: 16, offset: 4}}
    //             >
    //                 <Card
    //                     title={"Sales Per Day"}
    //                     extra={<RangePicker
    //                         onChange={e => {
    //                             // fetchSalesPerDay(moment(e[0]), moment(e[1]));
    //                         }}
    //                         allowClear={false}
    //                         style={{marginBottom: 8, width: '100%'}}
    //                         defaultValue={[state.from, state.to]}
    //                         // format={dateFormat}
    //                     />}
    //                     style={{margin: '5%', padding: '15px'}}
    //                 >
    //                     <Spin spinning={state.salesPerDayLoading}>
    //                         {/*<Column {...config} />*/}
    //                     </Spin>
    //                 </Card>
    //             </Col>
    //         </Row>
    //     </>
    // );
};

export default Home;
