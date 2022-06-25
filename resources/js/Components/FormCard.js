import {Card} from "antd";

const FormCard = (props) => {
    return (
        <div style={{
            backgroundImage: 'linear-gradient(rgba(204, 204, 204, 0.2) 0.1em, transparent 0.2em), linear-gradient(90deg, rgba(204, 204, 204, 0.2) 0.1em, transparent 0.1em)',
            backgroundSize: '.4em 0.4em',
            padding: '15px 0',
            borderBottom: '1px solid #cccccc'
        }}>
            <Card style={{
                minWidth: '450px',
                maxWidth: '1600px',
                minHeight: '330px',
                margin: '0 auto',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}>
                {props.children}
                {/*{props.loading ? null : props.children}*/}
            </Card>
        </div>
    )
}

export default FormCard;
