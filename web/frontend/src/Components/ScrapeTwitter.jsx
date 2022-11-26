import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

function ScrapeTwitter(props) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState(false);

    const [scrapeResults, setScrapeResults] = useState([]);

    const textInputRef = useRef();
    const scrapeBtnRef = useRef();
    let previousText = useRef('TEMPLATE MESSAGE');
    function scrape(){
        const text = textInputRef.current.value;
        if(text==previousText.current){
            setError('Type a different word/phrase');
            return;
        } else if(text==''){
            setError(`Input field can't be empty`);
            return;
        }
        previousText.current = text;
        setLoading(true);

        let xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost:8080/twitterScrapping', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            text: text
        }));
        xhr.onload = ()=>{
            setLoading(false);
            const response = xhr.responseText.slice(10, xhr.responseText.length);
            const temp_all = response.split(',');
            
            const temp_firstHundred = temp_all.slice(0,100);

            const temp_seperatedFrequancyAndWords = temp_firstHundred.map(elem=>{
                return elem.split(':');
            })

            const final = temp_seperatedFrequancyAndWords.map(elem=>{
                return elem.map(innerElem=>{
                    return (innerElem.replaceAll(' ', '')).replaceAll(`'`,'');
                })
            })
            setScrapeResults(final);
        }
    }
    
    useEffect(()=>{
        if(error!==null){
            setTimeout(() => {
                setError(null);
            }, 2000);
        }
    },[error])

    useEffect(()=>{
        if(loading==true){
            scrapeBtnRef.current.classList.add('button-disabled');
        }
        if(loading==false && scrapeBtnRef.current.classList.contains('button-disabled')){
            scrapeBtnRef.current.classList.remove('button-disabled');
        }
    },[loading])

    return (
        <div className='scrapeTwitter'>
            <h4 style={{fontSize:'2rem',margin:'10px'}}>Twitter scrapping</h4>
            <p className='errorMsg'>{error}</p>
            <input className='main-text-input' placeholder='Enter your word' ref={textInputRef}></input>
            <div className='input-results'>
                    <ul>
                        <li>Word</li>
                        <li>Frequency</li>
                    </ul>
                <div className='input-innerResults'>
                    {scrapeResults.map((singleField,index)=>{
                        if(isNaN(singleField[1]))return;
                        return(
                            <ul className='reddit-ul' key={index}>
                                <li>{singleField[0]}</li>
                                <li>{singleField[1]}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
            <div className='input-buttons'>
                <button onClick={()=>{scrape()}} ref={scrapeBtnRef}>{loading==true ? <div className="lds-dual-ring"></div> : <p style={{margin:'0'}}>Scrape</p>}</button>
                <button>Detailed view</button>
            </div>
            <button className='goBack-btn' onClick={()=>{props.setWhatToScrape('')}}>Go back</button>
        </div>
    );
}

export default ScrapeTwitter;