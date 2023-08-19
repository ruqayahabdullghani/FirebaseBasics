import React, { useState } from 'react'
import {createUserWithEmailAndPassword , signInWithPopup, signOut} from 'firebase/auth'
import {auth , googleProvider} from "../config/firebase"

export const Auth = () => {
  const [email , setEmail]= useState("");
  const [ password, setPassword]= useState("");

  console.log(auth?.currentUser?.email)

  const SingIn = async() => {
    try{
   await createUserWithEmailAndPassword(auth, email,password)}
    catch(err){
    console.err(err)
  }}

  const SignInWithGoogle = async() => {
    try{
      await signInWithPopup(auth,googleProvider)}
       catch(err){
       console.err(err)
     }
  }

  const LogOut = async() => {
    try{
      await signOut(auth)}
       catch(err){
       console.err(err)
     }
  }
  
return (
  <div>
    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
    <input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={SingIn}>SingIn</button>
    <button onClick={SignInWithGoogle}>Sing In with google</button>
    <button onClick={LogOut}>LogOut </button>
  </div>
);
}