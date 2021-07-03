/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../../styles/Product.module.css";
import { useRouter } from "next/dist/client/router";
import Menu from "../../components/navbar";
import { Container, Col, Row } from "react-bootstrap";
import { TiSocialTwitter } from "react-icons/ti";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import ReactImageMagnify from "react-image-magnify";

export default function Product({ product }) {
  const router = useRouter();
  return (
    <>
      <Menu />
      <Head>
        <title>{product.id}</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Container>
            <Row>
              <Col className={styles.col1} md={6}>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: `/images/product/${product["imglink"]}`,
                    },
                    largeImage: {
                      src: `/images/product/${product["imglink"]}`,
                      width: 1200,
                      height: 1800,
                    },
                  }}
                />
              </Col>
              <Col className={styles.col2} md={6}>
                <h1 className="mb-4 mt-3">
                  MOONSHINE - SMART JACKET - RDKLU#24
                </h1>
                <span className={styles.price1}> Rs. 3,331.00</span>
                <span className={styles.price2}> Rs. 999.00 </span>
                <span className={styles.price3}>Save 70%</span>
                <div className={styles.hdivider}></div>

                <ul className="mt-4">
                  <li className={styles.item}>
                    Fabric : 100% Polyester Jacquard
                  </li>
                  <li className={styles.item}>Digitally Printed</li>
                  <li className={styles.item}>with Zipper</li>
                  <li className={styles.item}>FAQ</li>
                </ul>

                <div className={styles.btncart}>ADD TO CART</div>
                <div className={styles.btnbuy}>BUY NOW</div>
                <div className={styles.social}>
                  <span className={styles.socialspan1}>
                    <FaInstagram color="darkpink" size="20px" /> Insta
                  </span>
                  <span className={styles.socialspan2}>
                    <FaWhatsapp color="darkpink" size="20px" /> share
                  </span>
                  <span className={styles.socialspan3}>
                    <TiSocialTwitter color="darkpink" size="20px" /> tweet us
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ params: { id } }) {
  const product_res = await fetch(
    `http://localhost:5001/final-feef1/us-central1/helloWorld`
  );
  const found = await product_res.json();
  const newId = parseInt(id) - 1;
  return {
    props: {
      product: found[newId],
    },
  };
}

export async function getStaticPaths() {
  // Get external data from the file system, API, DB, etc.
  const products_res = await fetch(
    `http://localhost:5001/final-feef1/us-central1/helloWorld`
  );
  const products = await products_res.json();
  return {
    paths: products.map((el) => ({
      params: { id: el["id"] },
    })),
    fallback: false,
  };
}
// export async function getStaticProps({ params }) {
//   const id =  params['id'];
//    console.log(id);
//     let product = {};
//   const req = await fetch(`http://localhost:3000/tesla.json`);
//   const data = [
//     {    "id": "1",
//     "name": "Dreamtime 1- Smart Jacket - RDKLU#26",
//     "price": "560",
//     "imglink": "RDKLU-3.1_540x.jpg"
//   },
//   {
//     "id": "2",
//     "name": "Dreamtime 2- Smart Jacket - RDKLU#26",
//     "price": "560",
//     "imglink": "3d4e9213-a5fa-49fd-b4c5-a8230a41c5c01623477163682-HRX-by-Hrithik-Roshan-Men-Tshirts-9291623477163134-1.webp"
//   },
//   {
//     "id": "3",
//     "name": "Dreamtime 3- Smart Jacket - RDKLU#26",
//     "price": "560",
//     "imglink": "08ea2923-1bfe-4f88-a13c-28be337b47681616398101252-HRX-by-Hrithik-Roshan-Women-Lavender-Self-Design-Round-Neck--1.webp"
//   },
//  {
//     "id": "4",
//     "name": "Dreamtime 4- Smart Jacket - RDKLU#26",
//     "price": "560",
//     "imglink": "bbaf9359-ff91-4eaf-9df7-0de47d66f0731621236696234BlackPrintedShiftDressTshirtsRoadsterWomenTshirtsRoadsterWom1.webp"
//   },
//   {
//     "id": "5",
//     "name": "Dreamtime 5- Smart Jacket - RDKLU#26",
//     "price": "560",
//     "imglink": "bbaf9359-ff91-4eaf-9df7-0de47d66f0731621236696234BlackPrintedShiftDressTshirtsRoadsterWomenTshirtsRoadsterWom1.webp"
//   },
//   {
//     "id": "6",
//     "name": "Dreamtime 6- Smart Jacket - RDKLU#26",
//     "price": "560",
//     "imglink": "bbaf9359-ff91-4eaf-9df7-0de47d66f0731621236696234BlackPrintedShiftDressTshirtsRoadsterWomenTshirtsRoadsterWom1.webp"
//   }
// ];
//   data.map((pr,index)=>{
//       if (pr['id'] ===  id) {
//           product = pr;
//           console.log(product);
//       }
//   })
//   return {
//     props: { car: product },
//   };
// }
