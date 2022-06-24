import {Button} from "antd";
import React, {useContext, useRef} from "react";
import {FormContext} from "../../Contexts/FormContext";
import ReactToPrint from "react-to-print";


const ComponentToPrint = React.forwardRef((props, ref) => {
    const formContext = useContext(FormContext);
    const values = formContext.formState.initialValues;

    const products = values.sales_order_lines ? values.sales_order_lines.map((salesOrderLine) => {
        return (
            <tr>
                <td className="quantity">{salesOrderLine.quantity}</td>
                <td className="description">{salesOrderLine.product.internal_reference}</td>
                <td className="price">{salesOrderLine.product.name}</td>
            </tr>
        )
    }) : [];

    return (<div className={'print-preview'}>
        <div className={'ticket'} ref={ref}>

            <p>
                {values.number}
                <br/>
                {values.customer ? values.customer.name : ''}
            </p>


            <table>
                <tbody>
                {products}
                </tbody>
            </table>


            <p className="centered">Ready By: {values.ready_by}</p>


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
