import {Button} from "antd";
import React, {useContext, useRef} from "react";
import {FormContext} from "../../Contexts/FormContext";
import ReactToPrint from "react-to-print";


const ComponentToPrint = React.forwardRef((props, ref) => {
    const formContext = useContext(FormContext);
    const values = formContext.formState.initialValues;

    const products = values.sales_order_lines ? values.sales_order_lines.map((salesOrderLine) => {
        return (<h5>{salesOrderLine.quantity} {salesOrderLine.product.internal_reference} {salesOrderLine.product.name}</h5>);
    }) : [];

    return (<div style={{position: 'fixed', marginTop: '-1000%'}}>
        <div ref={ref}>
            <hr style={{'borderTop': 'dotted 1px'}}/>
            <h3>{values.number}</h3>
            <h5>{values.customer ? values.customer.name : ''}</h5>
            <br/>
            {products}
            <br/>
            <h5>Ready By: {values.ready_by}</h5>

            <br/>
            <hr style={{'borderTop': 'dotted 1px'}}/>
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
