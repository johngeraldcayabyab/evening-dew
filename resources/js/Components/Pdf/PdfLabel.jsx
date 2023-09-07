const PdfLabel = (props) => {
    return (
        <p style={{marginTop: '0px', marginBottom: '0px'}}>
            <b>{props.label ? `${props.label}:` : ''}</b> {props.value ? props.value : ''}
        </p>
    )
};

export default PdfLabel;
