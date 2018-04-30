node fork.js --count=300 --path=./incr.js
node fork.js --count=302 --path=./decr.js
node worker.js &
node sendMessage.js --message="hi"
node agentWorker.js &
node fork.js --count=300 --path=./incr.js
node fork.js --count=302 --path=./qdecr.js

