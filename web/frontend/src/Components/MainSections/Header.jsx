import React from 'react';
import { useContext } from 'react';
import MyContext from '../../context';

function Header(props) {

    const {UID, setUID} = useContext(MyContext);

    return (
        <React.Fragment>
        <header>
            <div className='header-content'>
                <p className='name' style={{margin: '0'}}>Opa<img src={require('../../Photos/key.png')} style={{width: '50px', margin: '0 0 3 -10px'}}></img></p>
                {props.isAuthenticated == false ? <button onClick={()=>{props.setAuthenticated(false)}} className='header-btn'>Back to authentication</button> : <button onClick={()=>{setUID('');props.setAuthenticated(false)}} className='header-btn'>Log out</button>}
            
            </div>
        </header>
        </React.Fragment>
    );
}

export default Header;