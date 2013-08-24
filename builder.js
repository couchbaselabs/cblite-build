var path = require("path"),
    spawn = require('child_process').spawn;


function runStuff(test, cmd, cb) {
    var status = false,
        proc = spawn(cmd);

    proc.stdout.setEncoding('utf8');
    proc.stdout.on("data", function(data) {
        if (data.match(/^Success.*/)) {
            status = true
        }
    })
    proc.on("error", function(err){
        console.log("error", err)
        status = false
        cb(false)
    })
    proc.on("close", function(code){
        if (code !== 0) {
            status = false
        }
        cb(status)
    })
}

module.exports.build_gateway = function(path, cb){
    var cmd = "cd "+path+" && ./clean.sh && ./build.sh"
    runStuff(/^Success.*/, cmd, cb)
};

module.exports.build_cblios = function(path, cb){
    var cmd = "cd "+path+" && xcodebuild -target \"CBL iOS\""
    runStuff(/.*BUILD SUCCEEDED.*/, cmd, cb)
};

module.exports.build_listener = function(path, cb){
    var cmd = "cd "+path+" && xcodebuild -target \"CBL Listener iOS\""
    runStuff(/.*BUILD SUCCEEDED.*/, cmd, cb)
};

module.exports.build_liteserv = function(path, cb){
    var cmd = "cd "+path+" && xcodebuild -target LiteServ"
    runStuff(/.*BUILD SUCCEEDED.*/, cmd, cb)
};

module.exports.build_viewcompiler = function(path, cb){
    cmd = "cd "+path+" && xcodebuild -target CBLJSViewCompiler"
    runStuff(/.*BUILD SUCCEEDED.*/, cmd, cb)
};

