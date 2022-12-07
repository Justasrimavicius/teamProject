import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import MyContext from '../context';
import WordCloudSec from './MainSections/WordCloudSec';

import link from '../link';

function ScrapeTwitter(props) {
    const { UID } = useContext(MyContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [wordCloud, activateWordCloud] = useState(false);

    const [scrapeResults, setScrapeResults] = useState([]);

    const textInputRef = useRef();
    const resFreqRef = useRef();
    const scrapeBtnRef = useRef();
    let previousText = useRef('TEMPLATE MESSAGE');
    function scrape(){
        const text = textInputRef.current.value;
        let freq = resFreqRef.current.value;
        if(freq == '')freq = 100;
        if(freq != '' && isNaN(freq)){
            setError('Word quantity must be a number')
            return;
        }
        if(freq != '' && freq < 100){
            setError('Word frequency must be greater than 100')
            return;
        }
        if(freq != '' && freq > 1000){
            setError(`Word frequency can't be larger then 1000`)
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
        xhr.open('POST',`${link}/twitterScrapping`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            text: text,
            freq: freq
        }));
        xhr.onload = ()=>{
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
            activateWordCloud(false);
            scrapeBtnRef.current.classList.remove('button-disabled');
        }
    },[loading])

    return (
        <div className='scrapeTwitter'>
            <h4 style={{fontSize:'2rem',margin:'0'}}>Twitter scraping</h4>
            <p className='errorMsg'>{error}</p>
            <div className='inputs'>
                <input className='main-text-input' placeholder='Your word' ref={textInputRef}></input>
                <input className='main-text-input' placeholder='Word qty.' ref={resFreqRef}></input>
            </div>
            {wordCloud == false ?
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
                                <li>{singleField[0].toUpperCase()}</li>
                                <li>{singleField[1]}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
            : 
            <WordCloudSec array={scrapeResults} goBack={activateWordCloud}/>
            }
            <div className='input-buttons'>
                <button onClick={()=>{scrape()}} ref={scrapeBtnRef}>{loading==true ? <div className="lds-dual-ring"></div> : <p style={{margin:'0'}}>Scrape</p>}</button>
                <button onClick={()=>{if(scrapeResults.length == 0){setError('First, enter a word/phrase to scrape'); return};if(UID == ''){setError('You need to log in in order to see the word cloud');return;} activateWordCloud(true)}}>View word cloud</button>
            </div>
            <button className='goBack-btn' onClick={()=>{if(wordCloud == true){activateWordCloud(false); return}props.setWhatToScrape('')}}>Go back</button>
        </div>
    );
}

export default ScrapeTwitter;