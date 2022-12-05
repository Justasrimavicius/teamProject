import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import ScrapeReddit from '../ScrapeReddit';
import ScrapeTwitter from '../ScrapeTwitter';

function Content(props) {

    const [whatToScrape, setWhatToScrape] = useState('');


    return (
        <main>
            {whatToScrape=='' ?
                <>
                    <img src={require('../../Photos/twitterIcon.png')} alt='user icon' className='twitterIcon-main' onClick={()=>{setWhatToScrape('twitter')}}></img>
                    <img src={require('../../Photos/redditIcon.png')} alt='user icon' className='redditIcon-main' onClick={()=>{setWhatToScrape('reddit')}}></img>
                    <h1 style={{margin:'15px 10px 300px 10px', textAlign:'center'}}>Choose the platfrom you want to scrape information from</h1>
                </>
                :
                <>
                {whatToScrape=='reddit' ? 
                <ScrapeReddit setWhatToScrape={setWhatToScrape}/>
                : <ScrapeTwitter setWhatToScrape={setWhatToScrape}/>
                }
                </>
            }

        </main>
    );
}

export default Content;