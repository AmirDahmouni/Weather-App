import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/form.css"
import "../styles/App.css"
import {Singin}  from "../Services/userServices";
import GlobalContext from '../../GlobalContext';

export default function SingIn() {

    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const context = React.useContext(GlobalContext)
    let history = useHistory();

    const submit=async()=>{
       if(email.length==0 || password.length==0) return ;
       const response=await Singin(email,password)
       if(response.status==200){
        context.setUser(response.data)
        history.push("/home");
       }
    }

    return ( 
        <div className="App">
        <div className="App__container">
    <div className="form">
    <h2>SingIn !</h2>
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
      type="password"
          className="input"
          value={password}
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}/>
      </label>
      <button className="button" onClick={()=>submit()}>SignIn</button>
    </div>
    </div>
    </div>
    );
}