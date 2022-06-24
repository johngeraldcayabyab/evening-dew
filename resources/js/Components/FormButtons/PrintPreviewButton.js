import {Button} from "antd";
import React, {useContext, useRef} from "react";
import {FormContext} from "../../Contexts/FormContext";
import ReactToPrint from "react-to-print";


const ComponentToPrint = React.forwardRef((props, ref) => {
    const formContext = useContext(FormContext);
    const values = formContext.formState.initialValues;

    const products = values.sales_order_lines ? values.sales_order_lines.map((salesOrderLine) => {
        return (<tr style={{
            borderTop: '1px solid black',
            borderCollapse: 'collapse',
            fontSize: '12px',
            fontFamily: 'Times New Roman'
        }}>
            <td style={{
                borderTop: '1px solid black',
                borderCollapse: 'collapse',
                fontSize: '12px',
                fontFamily: 'Times New Roman'
            }}>{salesOrderLine.quantity}</td>
            <td style={{
                borderTop: '1px solid black',
                borderCollapse: 'collapse',
                fontSize: '12px',
                fontFamily: 'Times New Roman'
            }}>{salesOrderLine.product.internal_reference}</td>
            <td style={{
                borderTop: '1px solid black',
                borderCollapse: 'collapse',
                fontSize: '12px',
                fontFamily: 'Times New Roman'
            }}>{salesOrderLine.product.name}</td>
        </tr>)
    }) : [];

    return (<div className={'print-preview'}>
        <div style={{
            width: '155px',
            maxWidth: '155px',
        }} ref={ref}>

            <p>
                {values.number}
                <br/>
                {values.customer ? values.customer.name : ''}
            </p>

            <table style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                fontSize: '12px',
                fontFamily: 'Times New Roman'
            }}>
                <tbody style={{
                    borderTop: '1px solid black',
                    borderCollapse: 'collapse',
                    fontSize: '12px',
                    fontFamily: 'Times New Roman'
                }}>
                {products}
                </tbody>
            </table>

            <p style={{
                textAlign: 'center',
                alignContent: 'center',
                fontSize: '12px',
                fontFamily: 'Times New Roman'
            }}>Ready By: {values.ready_by}</p>
        </div>
    </div>);
});


const PrintPreviewButton = () => {
    const formContext = useContext(FormContext);
    const componentRef = useRef();

    if (formContext.id && formContext.formState.formDisabled) {
        return (<>
            <ReactToPrint
                trigger={() => <Button type={'primary'} size={'default'} htmlType={'button'}>Print Preview</Button>}
                content={() => componentRef.current}
            />
            <ComponentToPrint ref={componentRef}/>
        </>)
    }

    return null;
};

export default PrintPreviewButton;
