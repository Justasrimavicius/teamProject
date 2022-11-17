const {PythonShell} = require('python-shell');

exports.redditScrapping = (req,res,next)=>{
    // cia bus integracija su reddit scrapping python failu


    const text = req.body.text; // word that will be scrapped

    // let options = {
    //     mode: 'text',
    //     pythonPath: 'path/to/python',
    //     pythonOptions: ['-u'], // get print results in real-time
    //     scriptPath: '../../../python/main.py',
    //     args: [text]
    //   };
    
    //   PythonShell.run('my_script.py', options, function (err, results) {
    //     if (err) throw err;
    //     // results is an array consisting of messages collected during execution
    //     console.log('results: %j', results);
    //   });
}

exports.twitterScrapping = (req,res,next)=>{

    // cia bus integracija su twitter scrapping python failu(main.py)


    console.log(req.body);
    const text = req.body.text; // word that will be scrapped

    // let options = {
    //     mode: 'text',
    //     pythonPath: 'path/to/python',
    //     pythonOptions: ['-u'], // get print results in real-time
    //     scriptPath: '../../../python/main.py',
    //     args: ['value1', 'value2', 'value3']
    //   };
      
    //   PythonShell.run('my_script.py', options, function (err, results) {
    //     if (err) throw err;
    //     // results is an array consisting of messages collected during execution
    //     console.log('results: %j', results);
    //   });
};