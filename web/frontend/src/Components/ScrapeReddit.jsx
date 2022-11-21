import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

function ScrapeReddit(props) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState(false);

    const textInputRef = useRef();
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
        xhr.open('POST','http://localhost:8080/redditScrapping', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            text: text
        }));
        xhr.onload = ()=>{
            setLoading(false);
            const response = JSON.parse(xhr.responseText);
            if(response.error){
                setError(response.error);
            } else if(response.scrappingErr){
                setError('Uncaught error. Please retry the search')
            } else {
                // the response from python is in string format - it needs to be cleaned up and put in arrays properly

                // splits the response string into an array, but the arrays have "), " at the end
                // the temp array consists of strings, that contain both the word and the frequancy of the word
                const temp = xhr.responseText.split('(');

                // cleanerTemp consists of array of strings without the closing bracket
                const cleanerTemp = temp.map(element=>{
                    return element.slice(0,element.indexOf(')'));
                })

                // evenMoreCleanerTemp is the array, that consists of arrays that in the [0] index have the word, and at [1] have the frequancy
                const evenMoreCleanerTemp = cleanerTemp.map(element=>{
                    return element.split(', ')
                })

                // finalArray is like evenMoreCleanerTemp, but without the unnecessary paranthases in [0]
                const finalArray = evenMoreCleanerTemp.map(element=>{
                    const temporary = [element[0].replaceAll(`'`,''), parseFloat(element[1])]
                    return temporary;
                })
                console.log(finalArray)
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
                <button onClick={()=>{scrape()}}>{loading==true ? <div className="lds-dual-ring"></div> : <p style={{margin:'0'}}>Scrape</p>}</button>
                <button>Detailed view</button>
            </div>
            <button className='goBack-btn' onClick={()=>{props.setWhatToScrape('')}}>Go back</button>
        </div>
    );
}

export default ScrapeReddit;