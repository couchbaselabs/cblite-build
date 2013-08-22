var path = require("path"),
    exec = require('child_process').exec;


module.exports.build_gateway = function(path, cb){
    cmd = "cd "+path+" && ./clean.sh && ./build.sh"
    exec(cmd,
        function(error, stdout, stderr){
            status = false
            if (error === null){
                console.log(stdout);
                m = stdout.match(/^Success.*/);
                    if (m!==null){
                        status = true;
                    }
            } else{
                console.log(error);
            }
            cb(status);
    });
};

module.exports.build_liteserv = function(path, cb){
    cmd = "cd "+path+" && xcodebuild -target \"CBL iOS\""
    exec(cmd,
        function(error, stdout, stderr){
            status = false
            if (error === null){
                console.log(stdout);
                m = stdout.match(/.*BUILD SUCCEEDED.*/);
                if (m!==null){
                    status = true;
                }
            } else{
                console.log(error);
            }
            cb(status);
        });
};

module.exports.build_liteserv = function(path, cb){
    cmd = "cd "+path+" && xcodebuild -target \"CBL Listener iOS\""
    exec(cmd,
        function(error, stdout, stderr){
            status = false
            if (error === null){
                console.log(stdout);
                m = stdout.match(/.*BUILD SUCCEEDED.*/);
                if (m!==null){
                    status = true;
                }
            } else{
                console.log(error);
            }
            cb(status);
        });
};

module.exports.build_liteserv = function(path, cb){
    cmd = "cd "+path+" && xcodebuild -target LiteServ"
    exec(cmd,
        function(error, stdout, stderr){
            status = false
            if (error === null){
                console.log(stdout);
                m = stdout.match(/.*BUILD SUCCEEDED.*/);
                if (m!==null){
                    status = true;
                }
            } else{
                console.log(error);
            }
            cb(status);
        });
};

module.exports.build_liteserv = function(path, cb){
    cmd = "cd "+path+" && xcodebuild -target CBLJSViewCompiler"
    exec(cmd,
        function(error, stdout, stderr){
            status = false
            if (error === null){
                console.log(stdout);
                m = stdout.match(/.*BUILD SUCCEEDED.*/);
                if (m!==null){
                    status = true;
                }
            } else{
                console.log(error);
            }
            cb(status);
        });
};

