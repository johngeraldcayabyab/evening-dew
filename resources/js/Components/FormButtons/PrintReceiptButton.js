import {Button, message} from "antd";
import React, {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";
import useFetchHook from "../../Hooks/useFetchHook";
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook";
import {GET, POST} from "../../consts";
import {getDevice} from "../../Helpers/device";
import {setCookie} from "../../Helpers/cookie";
import {setUser} from "../../Helpers/user_helpers";

const PrintReceiptButton = () => {
    const formContext = useContext(FormContext);

    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();


    if (formContext.id && formContext.formState.formDisabled) {
        return (
            <Button
                htmlType={"button"}
                type={"primary"}
                size={'default'}
                onClick={() => {
                    useFetch(`/api/sales_orders/print_receipt`, POST, {
                        sales_order_id: formContext.formState.id
                    }).then((response) => {
                        console.log(response);
                    }).catch((responseErr) => {
                        fetchCatcher.get(responseErr);
                    });
                }}
            >
                Print Receipt
            </Button>
        )
    }

    return null;
};

export default PrintReceiptButton;
