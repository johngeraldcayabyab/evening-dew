import {Card} from "antd"

const Home = () => {
    return (
        <Card
            title="Dashboard"
            bordered={false}
            style={{
                width: 300,
                margin: 20
            }}
        >
            <p>You are now logged in!</p>
        </Card>
    );
};

export default Home;
