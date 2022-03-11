import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/form.css"
import {Singup} from "../Services/userServices"

export default function SingUp() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [repassword,setrePassword]=useState("")
    const [username,setUsername]=useState("")
    
    let history = useHistory();

    const submit=async()=>{
        
       if( password.length > 8 && username.length!=0 && email.length > 8 && password===repassword )
       {
        const response=await Singup(email,username,password,repassword)
        if(response.status==201)
        history.push("/SignIn");
       }
       
    }

    return ( 
        <div className="App">
        <div className="App__container">
    <div className="form">
       <h2>SingUp !</h2>

      <label className="label">
      <input
      type="email"
          className="input"
          value={email}
          placeholder="email"
          onChange={(e)=>setEmail(e.target.value)}/>
      </label>
      <label className="label">
      <input
      type="text"
          className="input"
          value={username}
          placeholder="username"
          onChange={(e)=>setUsername(e.target.value)}/>
      </label>

      <label className="label">
      <input
      type="password"
          className="input"
          value={password}
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}/>
      </label>

      <label className="label">
      <input
      type="password"
          className="input"
          value={repassword}
          placeholder="password"
          onChange={(e)=>setrePassword(e.target.value)}/>
      </label>
      <button className="button" onClick={()=>submit()} >SignUp</button>
    </div>
    </div>
   </div>
    )
}