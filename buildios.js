var builder = require("./builder");

var IOSRepo = "/Users/couchbase/buildbox/couchbase-lite-ios/";

var CMD_ARGS = process.argv.slice(2);
switch (CMD_ARGS[0])
    {
    case '--iosrepo': IOSRepo=CMD_ARGS[1];
                      break;
    case '-i':        IOSRepo=CMD_ARGS[1];
                      break;
    default:          console.log('use:  node buildios.js  --iosrepo .../path/repo/cloned/to');
                      return false;
    }
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
