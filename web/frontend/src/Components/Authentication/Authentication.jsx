import React, { useEffect, useState } from 'react';

import Login from './Login';
import Signup from './Signup';

function Authentication(props) {

    const [authButton, setAuthButton] = useState('default');

    return (
        <div className='authentication'>
            <div>
                <p className='welcome-text'>Welcome to Microgoogol - a language learning platform!</p>
                <div className='auth-inputs-holder'>
                    {
                    authButton=="default" ? 
                    
                    <> <button onClick={()=>{setAuthButton('signup')}}>Sign up</button>
                    <button onClick={()=>{setAuthButton('login')}}>Log in</button> </> 
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