import React, { useEffect, useState } from 'react';

import Login from './Login';
import Signup from './Signup';

function Authentication(props) {

    const [authButton, setAuthButton] = useState('default');

    return (
        <div className='authentication'>
            <div className='bubble1'></div>
            <div className='bubble2'></div>
            <div className='bubble3'></div>
            <div className='bubble4'></div>

            <div className='auth-left'>
                <p className='name'>Opa<img src={require('../../Photos/key.png')}></img></p>
                <p className='auth-mainText'>Find the latest news in glimpse of an eye</p>
                <button onClick={()=>{props.props.setAuthenticated('unauthenticated')}} className='unauthenticatedBtn'>Use without an account</button>
                <div className='seperator'></div>
                <div className='auth-icons'>
                    <img src={require('../../Photos/twitterIcon.png')} alt='twitter logo' className='twitter-img'></img>
                    <img src={require('../../Photos/redditIcon.png')} alt='reddit logo' className='reddit-img'></img>
                </div>
                
            </div>
            <div className='auth-right'>
                <div className='auth-inputs-holder'>
                    {
                    authButton=="default" ? 
                    
                    <> <button onClick={()=>{setAuthButton('login')}} className='signin-btn'>Sign in to your account</button>
                    <div className='auth-seperation'>
                        <div className='dash'></div>
                        <p style={{fontSize: '1.5rem'}}>or</p>
                        <div className='dash'></div>
                    </div>
                    <div className='signup'><button onClick={()=>{setAuthButton('signup')}} className='signup-btn'>Create a new account</button></div> </> 
                    :
                    <> {
                        authButton=='login' ?
                        <Login authState={{setAuthButton}} setAuthenticated={props.props.setAuthenticated}/>
                        :
                        <Signup authState={{setAuthButton}} setAuthenticated={props.props.setAuthenticated}/>
                    } </>
                    }

                </div>
            </div>
        </div>
    );
}

export default Authentication;