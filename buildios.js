var builder = require("./builder");

var stdio   = require('stdio');
var IOSRepo = "/Users/couchbase/buildbox/couchbase-lite-ios/";
var ops     = stdio.getopt( {'iosrepo': {key: 'r', args: 1, mandatory: false, description: "couchbase-lite-ios rep directory"}} );

if (ops.iosrepo) { IOSRepo = ops.iosrepo; } 
     
var build_tasks = ["build_cblios", "build_listener", "build_viewcompiler", "build_liteserv"]

function runTasks(tasks) {
  var task = tasks.pop()
  if (task) {
    console.log("running "+task)
    builder[task](IOSRepo, function(ok){
      if (ok) {
         console.log(task+" complete")
         runTasks(tasks)
      } else {
         console.log("error with "+task)
         console.log("buildios complete")
      }
    })
  } else {
    console.log("buildios complete")
  }
}

console.log("starting buildios")
runTasks(build_tasks);
