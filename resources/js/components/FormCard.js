import {Card} from "antd";

const FormCard = (props) => {
    return (
        <div style={{
            backgroundImage: `linear-gradient(45deg, transparent 20%, #cccccc 25%, transparent 25%),
            linear-gradient(-45deg, transparent 20%, #cccccc 25%, transparent 25%),
            linear-gradient(-45deg, transparent 75%, #cccccc 80%, transparent 0),
            radial-gradient(#cccccc 2px, transparent 0)`,
            backgroundSize: '15px 15px, 15px 15px',
            padding: '15px 0'
        }}>
            <Card style={{
                minWidth: '650px',
                maxWidth: '1140px',
                minHeight: '330px',
                margin: '0 auto',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}>
                {props.loading ? null : props.children}
            </Card>
        </div>
    )
}

export default FormCard;
