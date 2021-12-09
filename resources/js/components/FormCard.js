import {Card} from "antd";

const FormCard = (props) => {
    return (
        <Card style={{
            minWidth: '650px',
            maxWidth: '1140px',
            minHeight: '330px',
            margin: '12px auto 0 auto',
        }}>
            {props.loading ? null : props.children}
        </Card>
    )
}

export default FormCard;
