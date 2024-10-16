import {Card} from "antd";
import {useDispatch, useSelector} from "react-redux"
import {decrement, increment} from "../redux/slice"

const FormCard = (props) => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return (<div id={'form-card'}>

        {/*<h1>Count: {count}</h1>*/}
        {/*<button onClick={() => dispatch(increment())}>Increment</button>*/}
        {/*<button onClick={() => dispatch(decrement())}>Decrement</button>*/}

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
