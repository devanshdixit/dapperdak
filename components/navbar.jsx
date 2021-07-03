import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import firebase from "firebase/app";
import {
  IfFirebaseUnAuthed, IfFirebaseAuthed
} from "@react-firebase/auth";
import { Fragment } from 'react';
import { useRouter } from 'next/router'

const Menu = () => {
  const router = useRouter()
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link href="/"><a className={styles.title}>Random Thoughts</a></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={styles.card}>
            <IfFirebaseUnAuthed>
              {({ firebase }) => (
                <Fragment>
                  <Nav.Link href="/login" className="text-white">SignIn</Nav.Link>
                  <Nav.Link href="#deets" className="text-white">Register</Nav.Link>
                </Fragment>
              )}
            </IfFirebaseUnAuthed>
            <IfFirebaseAuthed>
              {({ isSignedIn }) => (
                <Nav.Link onClick={async () => {
                  await firebase.auth().signOut();  
                  router.push('/')
                }}  className="text-white">Sign Out</Nav.Link>
              )}
            </IfFirebaseAuthed>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Menu;