import React from 'react';

function Header(props) {
    return (
        <React.Fragment>
        <header>
            <div className='header-content'>
                <p className='name' style={{margin: '0'}}>Opa<img src={require('../../Photos/key.png')} style={{width: '50px', margin: '0 0 3 -10px'}}></img></p>
            </div>
        </header>
        </React.Fragment>
    );
}

export default Header;