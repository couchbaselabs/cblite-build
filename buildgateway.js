var builder = require("./builder"),
    test = require("tap").test;

SyncGatewayRepo = "/Users/couchbase/buildbox/sync_gateway/";

test("can build sync gateway", function(t) {
  builder.build_gateway(SyncGatewayRepo, function(sucess){
     t.true(sucess, "sync gateway build complete"); 
     t.end()
  });
});

