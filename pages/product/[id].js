import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Car({ car }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.container}>
      <Head>
        <title>
           {car.id}
        </title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{car.id}</h1>
        <Link>Home</Link>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id =  params['id'];
   console.log(id);
    let product = {};
  const req = await fetch(`http://localhost:3000/tesla.json`);
  const data = await req.json();
  data.map((pr,index)=>{
      if (pr['id'] ===  id) {
          product = pr;
          console.log(product);
      }
  })
  return {
    props: { car: product },
  };
}
