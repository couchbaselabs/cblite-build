export ANDROID_HOME=/usr/local/opt/android-sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$ANDROID_HOME:$ANDROID_SDK_ROOT:$PATH

EMULATOR=cblite
EFILE=/tmp/err.log
TAP_RESULTS=/tmp/tap.out
TAP_COUNT=1
TAP_PASS=0
TAP_FAIL=0
NUM_TAP_TESTS=4 # should match number of calls to tap()

echo "1.."$NUM_TAP_TESTS > $TAP_RESULTS

tap(){
  TAP_MSG=$TAP_COUNT" - "$1
  cat $EFILE | grep FAILED && echo "not ok "$TAP_MSG >> $TAP_RESULTS || echo "ok "$TAP_MSG >> $TAP_RESULTS
  cat $EFILE 
  echo "  ---" >> $TAP_RESULTS
  while read line; do
     echo "#"$line >> $TAP_RESULTS
  done < $EFILE

  TAP_COUNT=$((TAP_COUNT+1))
}

# pull latest
cd /Users/couchbase/buildbox/couchbase-lite-android/CouchbaseLiteProject
git pull



# build sdk
echo "build testing"
./build_android_testing.sh 2>&1 | tee $EFILE 
tap "build couchbase-lite-sdk" 

#create avd
echo no | android create avd -n $EMULATOR -t 24 --abi armeabi-v7a --force

# start emu
./stop_android_emulator.sh 
./start_android_emulator.sh $EMULATOR &
echo "starting emu"
sleep 60

# start a sync gateway
killall sync_gateway
/Users/couchbase/buildbox/sync_gateway/bin/sync_gateway /Users/couchbase/buildbox/cblite-tests/config/admin_party.json &

# run unit tests
#./run_android_unit_tests.sh  BLOCKED: http://github.com/couchbase/couchbase-lite-android/issues/35
./gradlew :CBLite:connectedInstrumentTest  2>&1 | tee  $EFILE
tap "cblite connected_instrument_test"

#./gradlew :CBLiteEktorp:connectedInstrumentTest | tee $EFILE
#tap "ecktorp connected_instrument_test"

./gradlew :CBLiteJavascript:connectedInstrumentTest 2>&1| tee $EFILE
tap "cbjs connected_instrument_test"
