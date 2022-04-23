import React, { useState } from 'react'
import './Login.scss'
import useAPI from '../hooks/useAPI';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const {getUser} = useAPI()
    const submitHandler = async () => {
        if (email.includes("@") && password.trim().length >= 6 ){
            const userid = await getUser({email, password})
            if(userid.user) {
                toast(`Login Successful`, { type: 'success' });
                history.push("/")
            }
            else {
                toast(`Error Signing up`, { type: 'error' });
            }

        }
        else {
            toast(`Invalid Credentials`, { type: 'error' });
        }
    }

  return (
    <div className='login__form'>
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
        <button onClick={submitHandler}>Login</button>
    </div>
  )
}

export default Login