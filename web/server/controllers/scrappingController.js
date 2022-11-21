const spawn = require('child_process').spawn;
// const path = require('node:path');
const path = require('path');
exports.redditScrapping = (req,res,next)=>{
    // cia bus integracija su reddit scrapping python failu

    const pathToRedditScript = path.join(__dirname,'../python/reddit.py');

    const text = req.body.text; // word that will be scrapped

    const proccess = spawn('python',[pathToRedditScript,text])

    proccess.stdout.on('data',data => {
      res.json(data.toString());
      return;
    })

    // proccess.stderr.on('data', data => {
    //   res.json({scrappingErr: data});
    //   return;
    // });

}

exports.twitterScrapping = (req,res,next)=>{

    // cia bus integracija su twitter scrapping python failu(main.py)


    console.log(req.body);
    const text = req.body.text; // word that will be scrapped

};