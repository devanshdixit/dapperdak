import { Nav,Navbar,NavDropdown,Container } from 'react-bootstrap';
import styles from "../styles/Home.module.css";
import Link from 'next/link'
const Menu = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
        <Navbar.Brand><Link href="/"><a className={styles.title}>Random Thoughts</a></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={styles.card}>
            <Nav.Link href="#deets" className="text-white">SignIn</Nav.Link>
            <Nav.Link href="#deets" className="text-white">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
export default Menu;