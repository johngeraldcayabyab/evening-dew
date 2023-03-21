import FormLabel from "../Typography/FormLabel";
import RowForm from "../Grid/RowForm";
import ColForm from "../Grid/ColForm";
import React from "react";

const LineColumn = (props) => {
    const columnLength = props.columns.length;
    const width = 100 / columnLength;
    const columns = props.columns.map((column) => {
        return (
            <FormLabel
                key={column}
                style={{
                    display: 'inline-block',
                    width: `${width}%`
                }}
            >
                {column}
            </FormLabel>
        );
    });
    return (
        <RowForm>
            <ColForm lg={23}>
                {columns}
            </ColForm>
            <ColForm lg={1}>
            </ColForm>
        </RowForm>
    );
}

export default LineColumn;
