import {Button} from "antd";
import React, {useContext, useRef} from "react";
import {FormContext} from "../../Contexts/FormContext";
import ReactToPrint from "react-to-print";


const ComponentToPrint = React.forwardRef((props, ref) => {
    const formContext = useContext(FormContext);
    const values = formContext.formState.initialValues;

    const products = values.sales_order_lines ? values.sales_order_lines.map((salesOrderLine) => {
        return (
            <p style={{borderBottom: 'dotted 1px black'}}>
                {salesOrderLine.quantity} x {salesOrderLine.product.internal_reference} - {salesOrderLine.product.name}
            </p>
        );
    }) : [];

    return (
        <div style={{position: 'fixed', marginTop: '-1000%'}}>
            <div ref={ref}>
                <div style={{color: 'black'}}>
                    <hr style={{'borderTop': 'solid 1px black'}}/>
                    <p style={{fontSize: '20px'}}><b>{values.number}</b></p>
                    <p>{values.customer ? values.customer.name : ''}</p>
                    <br/>
                    {products}
                    <br/>
                    <p>Ready By: {values.ready_by}</p>

                    <br/>
                    <hr style={{'borderTop': 'solid 1px black'}}/>
                </div>
            </div>
        </div>
    );
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
