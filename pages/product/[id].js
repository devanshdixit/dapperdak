import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
export default function Car({ car }) {

  
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {car.id}
        </title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{car.id}</h1>
        <Link href="/">Home</Link>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const id = params["id"];
  let product = {};
  const req = await fetch(`http://localhost:3000/tesla.json`);
  const data = await req.json();
  data.map((pr, index) => {
    if (pr["id"] === id) {
      product = pr;
    }
  });
  return {
    props: { car: product },
  };
}
export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/tesla.json`)
    const posts = await res.json()
    console.log(posts);
     // Get the paths we want to pre-render based on posts
    const paths = [
        { params: { id: '1' } },
        { params: { id: '2' } },
        { params: { id: '3' } },
        { params: { id: '4' } },
        { params: { id: '5' } },
        { params: { id: '6' } },
        
      ];
    console.log(paths);
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: false }
  }