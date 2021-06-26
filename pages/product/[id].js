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

export async function getStaticProps({ params }) {
  const id =  params['id'];
   console.log(id);
    let product = {};
  const req = await fetch(`http://localhost:3000/tesla.json`);
  const data = [
    {    "id": "1",
    "name": "Dreamtime 1- Smart Jacket - RDKLU#26",
    "price": "560",
    "imglink": "RDKLU-3.1_540x.jpg"
  },
  {
    "id": "2",
    "name": "Dreamtime 2- Smart Jacket - RDKLU#26",
    "price": "560",
    "imglink": "3d4e9213-a5fa-49fd-b4c5-a8230a41c5c01623477163682-HRX-by-Hrithik-Roshan-Men-Tshirts-9291623477163134-1.webp"
  },
  {
    "id": "3",
    "name": "Dreamtime 3- Smart Jacket - RDKLU#26",
    "price": "560",
    "imglink": "08ea2923-1bfe-4f88-a13c-28be337b47681616398101252-HRX-by-Hrithik-Roshan-Women-Lavender-Self-Design-Round-Neck--1.webp"
  },
 {
    "id": "4",
    "name": "Dreamtime 4- Smart Jacket - RDKLU#26",
    "price": "560",
    "imglink": "bbaf9359-ff91-4eaf-9df7-0de47d66f0731621236696234BlackPrintedShiftDressTshirtsRoadsterWomenTshirtsRoadsterWom1.webp"
  },
  {
    "id": "5",
    "name": "Dreamtime 5- Smart Jacket - RDKLU#26",
    "price": "560",
    "imglink": "bbaf9359-ff91-4eaf-9df7-0de47d66f0731621236696234BlackPrintedShiftDressTshirtsRoadsterWomenTshirtsRoadsterWom1.webp"
  },
  {
    "id": "6",
    "name": "Dreamtime 6- Smart Jacket - RDKLU#26",
    "price": "560",
    "imglink": "bbaf9359-ff91-4eaf-9df7-0de47d66f0731621236696234BlackPrintedShiftDressTshirtsRoadsterWomenTshirtsRoadsterWom1.webp"
  }
];
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
