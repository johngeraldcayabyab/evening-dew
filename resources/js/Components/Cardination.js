import {Avatar, Card} from "antd";
import {useContext, useState} from "react";
import {TableContext} from "../Contexts/TableContext";
import {useHistory} from "react-router-dom";

const {Meta} = Card;

const Cardination = () => {
    const listContext = useContext(TableContext);
    const history = useHistory();
    const [state, setState] = useState({
        columns: listContext.columns
    });

    return (
        <Card
            style={{
                width: 300,
                margin: '4px 8px',
            }}
        >
            <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                title="Card title"
                description="This is the description"
            />
        </Card>
    )
};

export default Cardination;
