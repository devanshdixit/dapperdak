/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Menu from "../components/navbar";
import styles from '../styles/Cart.module.css';
import { ListGroup,Row ,Col} from 'react-bootstrap'
import { useAppContext } from "../components/state";
import { loadCart, removeItemFromCart } from "../components/CartHelper";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Cart = () => {
    const router = useRouter()
    const { cart, setCart } = useAppContext();
    const [reload,setReload] = useState(false);
    const [total,setTotal] = useState(0);
    var price = 0;
    useEffect(() => {
        setCart(loadCart());
        addPrice();
    },[reload]);
    const  addPrice = () => {
        if (localStorage.getItem("cart")) {
        let it = JSON.parse(localStorage.getItem("cart"))
        it.map((item,index)=>{
            add(item['price'])
        });
    }
    }
    const  rePrice = () => {
        if (localStorage.getItem("cart")) {
        let it = JSON.parse(localStorage.getItem("cart"))
        setTotal(0);
        it.forEach(item => {  
            sub(item['price'])
        });
    }
    }
    function add(a){
        let prices = price + a;
        price = prices;
        setTotal(prices);
    }
    function sub(a){
        let prices = price - a;
        price = prices;
        setTotal(prices);
    }
    return (
        <>
        <Head><title>Cart</title></Head>
			<Menu />
            <div className={styles.formcontainer} style={{maxWidth:"560px"}}>
                <h1>Cart</h1>
                <ListGroup>
                    {cart.map((item,index)=>(
                        <Row key={index} className="mt-4 mb-4">
                            
                            <Col><img src={`/images/product/${item["imglink"]}`}  width="100"  height="100" alt=""/></Col>
                            <Col style={{margin:"auto 0px"}}><p>{item['name']}</p></Col>
                            <Col style={{margin:"auto 0px"}}><p>Rs.{item['price']}</p></Col>
                            <Col style={{margin:"auto 0px"}}><button onClick={()=>{
                                removeItemFromCart(item["id"]);
                                setReload(!reload);
                                rePrice();
                            }} className="btn btn-outline-success">remove</button></Col>
                        </Row>
                    ))}
                </ListGroup>
                <div className={styles.divider}>Total: Rs.{total}</div>
                <div className={styles.btnbuy}>Checkout</div>
            </div>
        </>
    );
}
 
export default Cart;