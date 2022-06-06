import {DualAxes} from "@ant-design/charts";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import FormButtons from "../../Components/FormButtons/FormButtons";
import ControlPanel from "../../Components/ControlPanel";
import {Link} from "react-router-dom";
import {setClickedBreadcrumb} from "../../Helpers/breadcrumbs";
import Title from "antd/lib/typography/Title";
import RowForm from "../../Components/Grid/RowForm";
import ColForm from "../../Components/Grid/ColForm";
import {useEffect, useState} from "react";
import useFetchHook from "../../Hooks/useFetchHook";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET} from "../../consts";
import {setUser} from "../../Helpers/user_helpers";
import {Skeleton, Spin} from "antd";

const Home = () => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    const [state, setState] = useState({
        salesPerDayLoading: true,
        salesPerDay: [],
    });

    useEffect(() => {
        useFetch(`/api/sales_orders/sales_per_day`, GET).then((response) => {
            setState((prevState) => ({
                ...prevState,
                salesPerDay: response,
                salesPerDayLoading: false,
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }, []);

    const data = [
        {
            time: '2022-06-04',
            total: 41245,
        },
        {
            time: '2022-06-05',
            total: 32360,
        },
    ];

    const config = {
        data: [state.salesPerDay, state.salesPerDay],
        xField: 'time',
        yField: ['total'],
        geometryOptions: [
            {
                geometry: 'column',
                color: '#5B8FF9',
                columnWidthRatio: 0.4,
                label: {
                    position: 'middle',
                },
            },
        ],
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
            <RowForm>
                <ColForm>
                    <DualAxes {...config} />
                </ColForm>
            </RowForm>

        </>
    );
};

export default Home;
