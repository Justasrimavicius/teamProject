import React, { useState, useContext } from 'react';

import MyContext from '../../context';
import link from '../../link';
function Signup(props) {

    const [authErrorMsg, setAuthErrorMsg] = useState('');

    const { UID, setUID } = useContext(MyContext);

    async function checkSubmit(e){

        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${link}/signup`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            email: e.currentTarget.email.value,
            emailR: e.currentTarget.emailR.value,
            password: e.currentTarget.password.value,
            passwordR: e.currentTarget.passwordR.value
        }));

        xhr.onload = ()=>{
            const parsedResponse = JSON.parse(xhr.responseText);
            if(parsedResponse.UID){
                setUID(parsedResponse.UID);
                props.setAuthenticated(true);
            } else {
                setAuthErrorMsg(parsedResponse);
            }
        }
    }

    return (
        <div className='signup-component'>
            <form onSubmit={(e)=>{checkSubmit(e)}}>
                <p>Fill in the form</p>
                <div className='signup-component-emailDiv'>
                    <label htmlFor='email'>Email:</label>
                    <input id='email' name='email'></input>
                    <label htmlFor='emailR'>Repeat email:</label>
                    <input id='emailR' name='emailR'></input>
                </div>
                <div className='signup-component-passwordDiv'>
                    <label htmlFor='password' typeof='password'>Password:</label>
                    <input id='password' name='password' type='password'></input>
                    <label htmlFor='passwordR' typeof='password'>Repeat password:</label>
                    <input id='passwordR' name='passwordR' type='password'></input>
                </div>
                <p className='auth-component-errorMsg'>{authErrorMsg}</p>
                <button className='button'>Sign up</button>
                <button className='auth-goBack-btn' type='button' onClick={()=>{props.authState.setAuthButton('default')}}>Go back</button>
            </form>
        </div>
    );
}
export default Signup;