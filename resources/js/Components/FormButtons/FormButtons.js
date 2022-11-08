import React from 'react';
import EditButton from "./EditButton";
import SaveEditButton from "./SaveEditButton";
import DiscardEditButton from "./DiscardEditButton";
import FormCreateButton from "./FormCreateButton";
import SaveCreateButton from "./SaveCreateButton";
import DiscardCreateButton from "./DiscardCreateButton";
import {Space} from "antd";

const FormButtons = (props) => {
    return (
        <Space size={'small'}>
            <EditButton/>
            <SaveEditButton/>
            <DiscardEditButton/>
            <FormCreateButton/>
            <SaveCreateButton/>
            <DiscardCreateButton/>
        </Space>
    )

    // return (
    //     <Space size={'small'}>
    //         {
    //             props.rights.edit ?
    //                 <>
    //                     <EditButton/>
    //                     <SaveEditButton/>
    //                     <DiscardEditButton/>
    //                 </>
    //                 : <></>
    //         }
    //         {
    //             props.rights.create ?
    //                 <>
    //                     <FormCreateButton/>
    //                     <SaveCreateButton/>
    //                     <DiscardCreateButton/>
    //                 </>
    //                 : ''
    //         }
    //     </Space>
    // )

    // if (props.rights) {
    //     return (
    //         <Space size={'small'}>
    //             {
    //                 props.rights.edit ?
    //                     <>
    //                         <EditButton/>
    //                         <SaveEditButton/>
    //                         <DiscardEditButton/>
    //                     </>
    //                     : <></>
    //             }
    //             {
    //                 props.rights.create ?
    //                     <>
    //                         <FormCreateButton/>
    //                         <SaveCreateButton/>
    //                         <DiscardCreateButton/>
    //                     </>
    //                     : ''
    //             }
    //         </Space>
    //     )
    // }
    // return <></>
};

export default FormButtons;
