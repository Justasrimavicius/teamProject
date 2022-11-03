import React from 'react';
import { useEffect } from 'react';

function Content(props) {

    useEffect(()=>{
        console.log(props.isAuthenticated)
    })

    return (
        <main>
            <img src={require('../../Photos/twitterIcon.png')} alt='user icon' className='twitterIcon-main'></img>
            <img src={require('../../Photos/redditIcon.png')} alt='user icon' className='redditIcon-main'></img>
            <input className='main-text-input'></input>
            <div className='input-results'>
                <div className='input-results-upper'></div>
            </div>
            <div className='input-buttons'>
                <button>Search again</button>
                <button>Detailed view</button>
            </div>
        </main>
    );
}

export default Content;