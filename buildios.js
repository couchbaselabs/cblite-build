var builder = require("./builder"),
    test = require("tap").test;

var IOSRepo = "/Users/couchbase/buildbox/couchbase-lite-ios/";

test("can build_cblios", function(t) {
  builder.build_cblios(IOSRepo, function(sucess){
     t.true(sucess, "build_cblios complete");
     t.end()
  });
});

test("can build_listener", function(t) {
  builder.build_listener(IOSRepo, function(sucess){
     t.true(sucess, "build_listener complete");
     t.end()
  });
});


test("can build view compiler", function(t) {
  builder.build_viewcompiler(IOSRepo, function(sucess){
     t.true(sucess, "view compiler build complete");
     t.end()
  });
});


test("can build_liteserv", function(t) {
  builder.build_liteserv(IOSRepo, function(sucess){
     t.true(sucess, "build_liteserv complete");
     t.end()
  });
});
