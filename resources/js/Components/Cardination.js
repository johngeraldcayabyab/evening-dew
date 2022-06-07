import {Avatar, Card, Space, Spin, Typography} from "antd";
import {useContext, useEffect} from "react";
import {TableContext} from "../Contexts/TableContext";
import {useHistory} from "react-router-dom";
import {getAllUrlParams} from "../Helpers/url";
import {uuidv4} from "../Helpers/string";


const {Meta} = Card;
const {Text} = Typography;

const Cardination = () => {
    const listContext = useContext(TableContext);
    const history = useHistory();

    useEffect(() => {
        return (() => {
            document.body.style.cursor = "default";
        });
    }, []);

    useEffect(() => {
        const selectedFields = listContext.kanban.selected_fields;
        const urlParams = getAllUrlParams();
        urlParams.selected_fields = selectedFields;
        listContext.tableActions.renderData(urlParams);
    }, []);

    const hiddenDrag = [];
    for (let i = 0; i < 12; i++) {
        hiddenDrag.push(
            <Card
                key={'hidden' + uuidv4()}
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

    const divStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: '11px',
        height: ''
    };

    if (listContext.tableState.loading) {
        divStyle.height = '200px';
    } else {
        delete divStyle.height;
    }

    return (
        <Spin spinning={listContext.tableState.loading}>
            <div style={divStyle}>
                {listContext.tableState.dataSource.map((data) => {
                    return (
                        <Card
                            key={'show' + uuidv4()}
                            size={'small'}
                            style={{
                                width: '300px',
                                margin: '4px 8px',
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
                                avatar={
                                    <Avatar
                                        shape="square"
                                        size={64}
                                        src={data[listContext.kanban.avatar] ? data[listContext.kanban.avatar] : '/images/no-image.jpg'}
                                    />
                                }
                                title={data[listContext.kanban.title]}
                                description={
                                    <Space direction={'vertical'} size={0}>
                                        {
                                            listContext.kanban.description.map((description) => {
                                                const dataValue = data[description.key];
                                                if (dataValue) {
                                                    return (
                                                        <Text
                                                            key={'text' + uuidv4()}
                                                            style={{fontSize: '13px'}}
                                                        >
                                                            {description.render(data)}
                                                        </Text>
                                                    )
                                                }
                                            })
                                        }
                                    </Space>
                                }
                            />
                        </Card>
                    )
                })}
                {hiddenDrag}
            </div>
        </Spin>
    )
};

export default Cardination;
