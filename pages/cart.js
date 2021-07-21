/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Menu from "../components/navbar";
import styles from "../styles/Cart.module.css";
import { ListGroup, Row, Col } from "react-bootstrap";
import { useAppContext } from "../components/state";
import { loadCart, removeItemFromCart } from "../components/CartHelper";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GooglePayButton from "@google-pay/button-react";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const Cart = () => {
  const router = useRouter();
  const { cart, setCart } = useAppContext();
  const [reload, setReload] = useState(false);
  const [total, setTotal] = useState(0);
  var price = 0;
  useEffect(() => {
    setCart(loadCart());
    addPrice();
  }, [reload]);
  const addPrice = () => {
    if (localStorage.getItem("cart")) {
      let it = JSON.parse(localStorage.getItem("cart"));
      it.map((item, index) => {
        add(item["price"]);
      });
    }
  };
  const rePrice = () => {
    if (localStorage.getItem("cart")) {
      let it = JSON.parse(localStorage.getItem("cart"));
      setTotal(0);
      it.forEach((item) => {
        sub(item["price"]);
      });
    }
  };
  function add(a) {
    let prices = price + a;
    price = prices;
    setTotal(prices);
  }
  function sub(a) {
    let prices = price - a;
    price = prices;
    setTotal(prices);
  }

  async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    console.log('script loaded');
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		} 

		const data = await fetch('https://us-central1-unique-nuance-310113.cloudfunctions.net/razorpay',{
      method: "POST",
      body: JSON.stringify({
        amount: total,
      },)
    }).then((t) =>
			t.json()
		)

		console.log(data)
    if (data.error) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
		const options = {
			key: 'rzp_test_5iQx14eJBLhSU1',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			handler: function (response) {
				console.log(response);
        if (response) {
          setCart([]);
          setTotal(0);

        }
			},
			prefill: {
				name:'name',
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}



  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Menu />
      <div className={styles.formcontainer} style={{ maxWidth: "560px" }}>
        <h1>Cart</h1>
        <ListGroup>
          {cart != undefined
            ? cart.map((item, index) => (
                <Row key={index} className="mt-4 mb-4">
                  <Col>
                    <img
                      src={`/images/product/${item["imglink"]}`}
                      width="100"
                      height="100"
                      alt=""
                    />
                  </Col>
                  <Col style={{ margin: "auto 0px" }}>
                    <p>{item["name"]}</p>
                  </Col>
                  <Col style={{ margin: "auto 0px" }}>
                    <p>Rs.{item["price"]}</p>
                  </Col>
                  <Col style={{ margin: "auto 0px" }}>
                    <button
                      onClick={() => {
                        removeItemFromCart(item["id"]);
                        setReload(!reload);
                        rePrice();
                      }}
                      className="btn btn-outline-success"
                    >
                      remove
                    </button>
                  </Col>
                </Row>
              ))
            : ""}
        </ListGroup>
        <div className={styles.divider}>Total: Rs.{total}</div>
        <div className={styles.btnbuy} onClick={displayRazorpay}>Continue</div>
      </div>
    </>
  );
};

export default Cart;
