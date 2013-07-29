#!/bin/sh

BUILDDIR=$HOME/tmp/sgw
DIST=$BUILDDIR/dist

pkg=github.com/couchbaselabs/sync_gateway
g=./go.sh

rm -rf $BUILDDIR
mkdir -p $BUILDDIR
cd $BUILDDIR
git clone git://builds.hq.northscale.net/labs/sync_gateway.git
cd sync_gateway
git submodule update --init

./build.sh || exit 1

echo eval env GOARCH=386   GOOS=linux CGO_ENABLED=0 $g build -o 
$DIST/sync_gateway.l\
in32 $pkg &
eval env GOARCH=arm   GOOS=linux CGO_ENABLED=0 $g build -o 
$DIST/sync_gateway.a\
rm $pkg &
eval env GOARCH=arm   GOARM=5 GOOS=linux CGO_ENABLED=0 $g build -o 
$DIST/sync_g\
ateway.arm5 $pkg &
eval env GOARCH=amd64 GOOS=linux CGO_ENABLED=0 $g build -o 
$DIST/sync_gateway.l\
in64 $pkg &
eval env GOARCH=amd64 GOOS=freebsd CGO_ENABLED=0 $g build -o 
$DIST/sync_gateway\
.fbsd $pkg &&
eval env GOARCH=386   GOOS=windows $g build -o 
$DIST/sync_gateway.win32.exe $pk\
g &
eval env GOARCH=amd64 GOOS=windows $g build -o 
$DIST/sync_gateway.win64.exe $pk\
g &
eval env GOARCH=amd64 GOOS=darwin $g build -o $DIST/sync_gateway.mac $pkg &

wait

gzip -9 $DIST/sync_gateway.*

cbfsclient upload $DIST/ sync_gateway/
