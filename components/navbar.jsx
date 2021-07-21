import { Nav, Navbar, Badge, Container } from 'react-bootstrap';
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import firebase from "firebase/app";
import {
  IfFirebaseUnAuthed, IfFirebaseAuthed
} from "@react-firebase/auth";
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAppContext } from './state';
import { LinkContainer } from "react-router-bootstrap";
import { loadCart } from './CartHelper';
const Menu = () => {
  const router = useRouter()
  const { cart, setCart } = useAppContext();
  let contextData = cart;
  const [reload,setReload] = useState(false);
  useEffect(() => {
      setCart(loadCart());
  },[reload, setCart]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link href="/"><a className={styles.title}>Dapper Dak</a></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={styles.card}>
           <div className={styles.navlink}><Link href="/cart">Cart </Link>{contextData != undefined ?  contextData.length !== 0 ?
              (<span className={styles.cartcount}>{contextData.length}</span>)
              : '' : ''}</div>
            <IfFirebaseUnAuthed>
              {({ firebase }) => (
                <Fragment>
                  <div className={styles.navlink}><Link href="/login">SignIn</Link></div>
                </Fragment>
              )}
            </IfFirebaseUnAuthed>
            <IfFirebaseAuthed>
              {({ isSignedIn }) => (
                <Nav.Link onClick={async () => {
                  await firebase.auth().signOut();
                  router.push('/')
                }} className={styles.navlink} style={{ fontWeight: "100", letterSpacing: "0.07em" }}>Sign Out</Nav.Link>
              )}
            </IfFirebaseAuthed>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Menu;