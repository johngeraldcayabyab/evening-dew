import {Card} from "antd";

const FormCard = (props) => {
    return (<div id={'form-card'}>
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
        </div>)
}

export default FormCard;
