import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector,useDispatch } from 'react-redux';
import './signup.css';
import {useNavigate} from 'react-router-dom';
import {signup} from '../../actions/login/loginActions'

const useStyles = makeStyles(theme => ({
 
}));

const SignUp = ({  }) => {
  const classes = useStyles();
  // create state variables for each input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, email, password);
    let data={
      name:name,
      email:email,
      password:password
    }
    dispatch(signup(data));
    
  };

  const signedUp = useSelector((state)=>state.login_r._signup);

  useEffect(()=>{
    if(signedUp != undefined){
      if(signedUp.status == true){
        navigate("/login");
      }else{
        alert(signedUp?.message);
      }
    }

  },[signedUp])

  const handleCancel = () =>{
    navigate("/login");
  }

  return (
    <React.Fragment>
    <div style={{backgroundColor:"#102961",display:"flex",flexDirection:"column",justifyContent:"center",height:window.innerHeight,alignItems:"center"}}>
    <div style={{color:"#fff",margin:10,fontSize:24}}>Sign Up</div>
    <form className={"root"} onSubmit={handleSubmit}>
      <TextField
       className={"MuiTextField"}
        label="Name"
        variant="filled"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      
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
        <Button variant="contained" className={"MuiButtonBase"} onClick={handleCancel}>
          Back
        </Button>
        <Button type="submit" className={"MuiButtonBase"} variant="contained" color="primary" >
          Signup
        </Button>
      </div>
    </form>
    </div>
    </React.Fragment>
  );
};

export default SignUp;