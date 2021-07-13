
import  AppWrapper  from '../components/state'
import '../styles/bootstrap-5.0.2-dist/css/bootstrap.css'
import '../styles/bootstrap-5.0.2-dist/css/bootstrap.min.css'
import '../styles/globals.css'
import firebase from "firebase/app";
import "firebase/auth";
import config from "../components/credentials";
import {
	FirebaseAuthProvider
  } from "@react-firebase/auth";

function MyApp({ Component, pageProps }) {
  return  <FirebaseAuthProvider firebase={firebase} {...config}><AppWrapper><Component {...pageProps} /></AppWrapper></FirebaseAuthProvider> 
}

export default MyApp
