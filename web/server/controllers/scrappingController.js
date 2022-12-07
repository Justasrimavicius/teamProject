const spawn = require('child_process').spawn;
const path = require('path');
exports.redditScrapping = (req,res,next)=>{

    const pathToScript = path.join(__dirname,'../reddit.py');
    const text = req.body.text; // word that will be scrapped
    const freq = req.body.freq;
    let isResSent = false;

    const proccess = spawn('python',[pathToScript,text,freq])
    proccess.stdout.on('data',data => {
      if(!isResSent){
        res.json(data.toString());
        return;
      }
    })
    proccess.stderr.on('data',(err)=>{
      console.log(err.toString())
      res.json(res.toString());
    })
}

exports.twitterScrapping = (req,res,next)=>{
    const pathToScript = path.join(__dirname,'../main.py');

    const text = req.body.text; // word that will be scrapped
    const freq = req.body.freq;
    let isResSent = false;
    const proccess = spawn('python',[pathToScript,text,freq])
    proccess.stdout.on('data',data => {
      if(!isResSent){
        isResSent = true;
        res.json(data.toString());
        return;
      }
    })

    proccess.stderr.on('data',(err)=>{
      console.log(err.toString())
      res.json(err.toString())
    })
};