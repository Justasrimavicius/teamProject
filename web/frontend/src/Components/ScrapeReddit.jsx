import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

function ScrapeReddit(props) {

    const [error, setError] = useState(null);

    const textInputRef = useRef();

    function scrape(){
        const text = textInputRef.current.value;

        let xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost:8080/redditScrapping', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            text: text
        }));
        xhr.onload = ()=>{
            const response = JSON.parse(xhr.responseText);
            if(response.error){
                setError(response.error);
            }
        }
    }
    
    useEffect(()=>{
        if(error!==null){
            setTimeout(() => {
                setError(null);
            }, 2000);
        }
    },[error])

    return (
        <div className='scrapeReddit'>
            <h4 style={{fontSize:'2rem',margin:'10px'}}>Reddit scrapping</h4>
            <p className='errorMsg'>{error}</p>
            <input className='main-text-input' placeholder='Enter your word' ref={textInputRef}></input>
            <div className='input-results'>
                <div className='input-results-upper'></div>
            </div>
            <div className='input-buttons'>
                <button onClick={()=>{scrape()}}>Scrape</button>
                <button>Detailed view</button>
            </div>
            <button className='goBack-btn' onClick={()=>{props.setWhatToScrape('')}}>Go back</button>
        </div>
    );
}

export default ScrapeReddit;