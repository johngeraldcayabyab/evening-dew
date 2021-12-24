import {Card} from "antd";

const FormCard = (props) => {
    return (
        <Card style={{
            minWidth: '650px',
            maxWidth: '1140px',
            minHeight: '330px',
            margin: '12px auto 0 auto',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}>
            {props.loading ? null : props.children}
        </Card>
    )
}

export default FormCard;
