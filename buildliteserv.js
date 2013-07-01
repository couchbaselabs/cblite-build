var builder = require("./builder"),
    test = require("tap").test;

LiteServRepo = "/Users/couchbase/couchbase-lite-ios/";

test("can build liteserv", function(t) {
  builder.build_liteserv(LiteServRepo, function(sucess){
     t.true(sucess, "liteserv build complete"); 
     t.end()
  });
});

