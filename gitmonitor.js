var express = require('express'),
    app = express(),
    exec = require('child_process').exec;



app.get('/git/:account/:repo', function(req, res){
    account = req.params.account;
    repo = req.params.repo;
    cmd = "git ls-remote https://github.com/"+account+"/"+repo+" | head -1 | cut -f 1"
    exec(cmd, 
        function(error, stdout, stderr){
            if (error === null){
                console.log(repo+stdout);
                res.send(repo+stdout);
            } else{
                res.send('');
            }
        });
    
});
app.listen(2022, "10.6.0.131");
