import React from 'react'
import { Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css';
import Menu from "../components/navbar"
import { FcGoogle } from "react-icons/fc";
import config from '../components/credentials';
import firebase from "firebase/app";
import Head from "next/head";
import "firebase/auth";
import {
	IfFirebaseUnAuthed, FirebaseAuthProvider, IfFirebaseAuthed
} from "@react-firebase/auth";

const SignIn = () => {
	const router = useRouter()
	return (
		<>
			<Head><title>Login</title></Head>
			<FirebaseAuthProvider firebase={firebase} {...config}>
				<Menu />
				<div className={styles.formcontainer} style={{ maxWidth: "460px", boxShadow: "10 10px rgb(43, 30, 30)" }}>
					<Form className='was-validated' style={{ margin: "0px auto" }}>
						<div className="pt-2 form-group text-center mb-4">
							<h2>Sign In</h2>
						</div>
						<IfFirebaseUnAuthed>
							{({ firebase }) => {
								return <div className="divider">
									<div className={styles.btnbuy} onClick={async () => {
										try {
											const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
											const user = await firebase.auth().signInWithPopup(googleAuthProvider);
											const userdata = user['additionalUserInfo']['profile'];
											addUser(userdata);
											const data = await fetch('https://us-central1-unique-nuance-310113.cloudfunctions.net/user',
												{
													method: "POST",
													body: JSON.stringify(userdata),

												}).then((t) =>
													t.json()
												);
											console.log(data);
											router.push('/')
										} catch (error) {
											console.log(error);
										}
									}} type="click"><FcGoogle fontSize="28" /> Login with Google</div>
								</div>
							}}
						</IfFirebaseUnAuthed>
						<IfFirebaseAuthed>
						{({ firebase }) => {
								return <div className="divider">
									<div className={styles.btnbuy} onClick={async () => {
										try {
											await firebase.auth().signOut();
											router.push('/')
										} catch (error) {
											console.error(error);
										}
									}} type="click"><FcGoogle fontSize="28" /> Sign Out</div>
								</div>
							}}
						</IfFirebaseAuthed>
						{/* <hr />
								<p>Dont  have an account? <Link href="/signin">Sign in</Link></p> */}
					</Form>
				</div>
			</FirebaseAuthProvider>
		</>
	)
}

export default SignIn

const addUser = (userData) => {
    let user = []
    if(typeof window !== undefined)
    {
        if (localStorage.getItem("user")) {
            user = JSON.parse(localStorage.getItem("user"))
        }
        user.push({
            ...userData,
        })
        localStorage.setItem("user",JSON.stringify(user))
    }
}