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
    const resFreqRef = useRef();
    const scrapeBtnRef = useRef();
    let previousText = useRef('TEMPLATE MESSAGE');
    function scrape(){
        const text = textInputRef.current.value;
        let freq = resFreqRef.current.value;
        if(freq == '')freq = 100;
        console.log(freq)
        if(freq != '' && isNaN(freq)){
            setError('Word quantity must be a number')
            return;
        }
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
            text: text,
            freq: freq
        }));
        xhr.onload = ()=>{
            console.log(xhr.responseText)
            setLoading(false);
            const response = xhr.responseText.slice(2, xhr.responseText.length - 4);
            const temp_all = response.split('(');
            const cleanerTemp = temp_all.map(res => {
                return res.slice(0, res.indexOf(')'))
            })
            cleanerTemp.shift();
            const temp_seperatedFrequancyAndWords = cleanerTemp.map(elem=>{
                return elem.split(',');
            })

            const final = temp_seperatedFrequancyAndWords.map(elem=>{
                return elem.map(innerElem=>{
                    return (innerElem.replaceAll(' ', '')).replaceAll(`'`,'');
                })
            })
            console.log(final);
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
            <div className='inputs'>
                <input className='main-text-input' placeholder='Your word' ref={textInputRef}></input>
                <input className='main-text-input' placeholder='Word qty.' ref={resFreqRef}></input>
            </div>
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