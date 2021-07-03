import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css';
import Link from "next/link";
import Menu from "../components/navbar"
import { FcGoogle} from "react-icons/fc";
import config from '../components/credentials';
import firebase from "firebase/app";
import Head from "next/head";
import "firebase/auth";
import {
	IfFirebaseUnAuthed,FirebaseAuthProvider
  } from "@react-firebase/auth";

const  SignIn = () => {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
        <>
		<Head><title>Login</title></Head>
		<FirebaseAuthProvider firebase={firebase} {...config}>
			<Menu/>
			<div className={styles.formcontainer} style={{maxWidth:"460px",boxShadow:"10 10px rgb(43, 30, 30)"}}>
							<Form className='was-validated' style={{margin:"0px auto"}}>
								<div className="pt-2 form-group text-center">
									<h2>Sign In</h2>
								</div>
								<Form.Group controlId="signupEmail" className="mt-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" required placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
									<div className="invalid-feedback">Please fill out this field.</div>
								</Form.Group>
								<Form.Group controlId="signupPassword" className="mt-3">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" required maxLength="25" placeholder="At least 6 characters" length="40" onChange={(e) => { setPassword(e.target.value) }} />
								</Form.Group>
								<div className={styles.btncart} onClick={()=> {
										console.log(email +','+password)
									}} id="signupSubmit"  type="submit">Sign In</div>
           
								<IfFirebaseUnAuthed>
    							{({ firebase }) => {
							  return <div className="divider ">
								   <div className={styles.btnbuy} onClick={async ()=> {
										try{
											const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
											await firebase.auth().signInWithPopup(googleAuthProvider);
											router.push('/')
										} catch(error) {
											console.log(error);
										}
									}} type="click"><FcGoogle fontSize="28" /> Login with Google</div>
								</div>
								}}
								</IfFirebaseUnAuthed>
								<hr />
								<p>Dont  have an account? <Link href="/signin">Sign in</Link></p>
							</Form>
			</div>
			</FirebaseAuthProvider>
        </>
	)
}

export default SignIn