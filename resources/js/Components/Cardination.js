import {Avatar, Card, Col, Row, Space, Typography} from "antd";
import {useContext, useEffect, useState} from "react";
import {TableContext} from "../Contexts/TableContext";
import {useHistory} from "react-router-dom";
import {getAllUrlParams} from "../Helpers/url";


const {Meta} = Card;
const {Text} = Typography;

const Cardination = () => {
    const listContext = useContext(TableContext);
    const history = useHistory();
    const [state, setState] = useState({
        columns: listContext.columns
    });

    useEffect(() => {
        return (() => {
            document.body.style.cursor = "default";
        })
    }, []);

    useEffect(() => {
        const selectedFields = [];
        /**
         * cardination doesnt need this?
         */
        const columns = state.columns.map((column) => {
            return column;
        });
        setState((prevState) => ({
            ...prevState,
            columns: columns,
        }));
        const urlParams = getAllUrlParams();
        urlParams.selected_fields = selectedFields;
        listContext.tableActions.renderData(urlParams);
    }, []);


    const hiddenDrag = [];

    for (let i = 0; i < 12; i++) {
        hiddenDrag.push(
            <Card
                bordered={false}
                style={{
                    width: '300px',
                    margin: '4px 8px',
                    height: '0px',

                }}
            >
            </Card>
        )
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
        }}>
            {listContext.tableState.dataSource.map((data) => {
                return (
                    <Card
                        size={'small'}
                        style={{
                            width: '300px',
                            margin: '15px 8px',
                        }}
                        onClick={(event) => {
                            history.push(`/${listContext.manifest.moduleName}/${data.id}`);
                        }}
                        onMouseEnter={(event) => {
                            document.body.style.cursor = "pointer";
                        }}
                        onMouseLeave={(event) => {
                            document.body.style.cursor = "default";
                        }}
                    >
                        <Meta
                            avatar={<Avatar shape="square" size={64}
                                            src={data.avatar ? data.avatar : '/images/no-image.jpg'}/>}
                            title={data.name}
                            description={
                                <Space direction={'vertical'} size={0}>
                                    {data.internal_reference ? <Text style={{fontSize:'13px'}}>[{data.internal_reference}]</Text> : null}
                                    <Text style={{fontSize:'13px'}}>Price: $ {data.sales_price}</Text>
                                    <Text style={{fontSize:'13px'}}>On Hand: {data.quantity} {data.measurement.name}</Text>
                                </Space>
                            }
                        />
                    </Card>
                )
            })}
            {hiddenDrag}
        </div>
    )
};

export default Cardination;
