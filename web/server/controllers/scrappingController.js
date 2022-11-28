const spawn = require('child_process').spawn;
// const path = require('node:path');
const path = require('path');
exports.redditScrapping = (req,res,next)=>{
    // cia bus integracija su reddit scrapping python failu

    const pathToRedditScript = path.join(__dirname,'../python/reddit.py');

    const text = req.body.text; // word that will be scrapped
    const freq = req.body.freq;
    const proccess = spawn('python',[pathToRedditScript,text,`${freq}`])

    proccess.stdout.on('data',data => {
      res.json(data.toString());
      return;
    })
}

exports.twitterScrapping = (req,res,next)=>{

    // cia bus integracija su twitter scrapping python failu(main.py)
    const pathToRedditScript = path.join(__dirname,'../python/main.py');

    const text = req.body.text; // word that will be scrapped
    let isResSent = false;
    const proccess = spawn('python',[pathToRedditScript,text,100])
    proccess.stdout.on('data',data => {
      console.log(data.toString())
      if(!isResSent){
        isResSent = true;
        res.json(data.toString());
        return;
      }
    })

};