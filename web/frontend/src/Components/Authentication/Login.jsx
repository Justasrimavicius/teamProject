import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import MyContext from '../../context';
import link from '../../link';
function Login(props){
    
    const [authErrorMsg, setAuthErrorMsg] = useState('');

    const { UID, setUID } = useContext(MyContext);
    
    function submitForm(e){
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${link}/login`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        }));

        xhr.onload = ()=>{
            const parsedResponse = JSON.parse(xhr.responseText);
            if(parsedResponse.UID){
                setUID(parsedResponse.UID);
                props.setAuthenticated(true);
            } else {
                setAuthErrorMsg(xhr.responseText);
            }
        }
    }

    return (
        <div className='login-component'>
        <form onSubmit={(e)=>{submitForm(e)}}>
            <p>Sign in to your account</p>
            <div className='login-comoponent-inputHolder'>
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email'></input>
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password'></input>
            </div>
            <p className='auth-component-errorMsg'>{authErrorMsg}</p>
            <button className='button'>Log in</button>
            <button className='auth-goBack-btn' type='button' onClick={()=>{props.authState.setAuthButton('default')}}>Go back</button>
        </form>
    </div>
    );
}

export default Login;