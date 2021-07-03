import React, { useState } from 'react'
import { Form ,Button} from 'react-bootstrap'
import Link from "next/link";
import Menu from "../components/navbar"
import firebase from "firebase/app";
import Head from "next/head";
function Register(props) {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<>
		<Head><title>Register</title></Head>
			<Menu />
			<div className="formcontainer shadow container pt-4 pb-4 mt-4">
				<div className="row ">
					<div className="panel panel-primary">
						<div className="panel-body">
							<Form className='was-validated'>
								<div className="pt-2 form-group text-center">
									<h2>Create account</h2>
								</div>
								<Form.Group controlId="signupName">
									<Form.Label>Your name</Form.Label>
									<Form.Control type="name" required placeholder="Enter your name" onChange={(e) => { setName(e.target.value) }} />
									<div className="invalid-feedback">Please fill out this field.</div>
								</Form.Group>
								<Form.Group controlId="signupEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" required placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
									<div className="invalid-feedback">Please fill out this field.</div>
								</Form.Group>
								<Form.Group controlId="signupPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" required maxLength="25" placeholder="At least 6 characters" length="40" onChange={(e) => { setPassword(e.target.value) }} />
								</Form.Group>
								<Form.Group controlId="signupPasswordagain">
									<Form.Label>Confirm password</Form.Label>
									<Form.Control type="password" required maxLength="25" placeholder="Confirm Password" length="40" onChange={(e) => {  }} />
								</Form.Group>
								<div className="divider">
									<Button variant="dark" onClick={()=>{
										console.log(email +','+name+','+password)
									}} id="signupSubmit" block type="submit">Create your account</Button>
								</div>
								<p className="form-group">By creating an account, you agree to our <Link to="/" >Terms of Use</Link> and our <Link to="/">Privacy Policy</Link>.</p>
								<hr />
								<p>Already have an account? <Link to="/signin">Sign in</Link></p>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Register