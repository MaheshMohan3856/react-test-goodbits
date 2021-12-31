import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.css';
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {login} from "../../actions/login/loginActions"


const Login = ({  }) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
 
  // create state variables for each input
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log( email, password);
    let data = {
        email:email,
        password:password
    }
    dispatch(login(data))
    
  };

  const loggedIn = useSelector((state)=>state.login_r._login);

  useEffect(()=>{
    if(loggedIn != undefined){
        if(loggedIn.status == true){
            localStorage.setItem("@authorised",true);
            navigate("/listing");
        }else{
            alert(loggedIn?.message);
        }
    }
  },[loggedIn])

  return (
    <React.Fragment>
    <div style={{backgroundColor:"#102961",display:"flex",flexDirection:"column",justifyContent:"center",height:window.innerHeight,alignItems:"center"}}>
    <div style={{color:"#fff",margin:10,fontSize:24}}>Login</div>
    <form className={"root"} onSubmit={handleSubmit}>
    
      
      <TextField
        
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className={"buttonMargin"}>
        
        <Button type="submit" className={"MuiButtonBase"} variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
    <div>Doesn't have an account. <span style={{color:"orange",cursor:"pointer"}} onClick={()=>navigate("/register")}>Sign Up</span>  </div>
    </div>
    </React.Fragment>
  );
};

export default Login;