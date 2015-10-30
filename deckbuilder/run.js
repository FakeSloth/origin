var exec = require('child_process').exec;
var fs = require('fs');

fs.watchFile(__dirname + '/src/app.js', function() {
  console.log('============');
  console.log('UPDATING....');
  console.log('============');
  exec('webpack').stdout.pipe(process.stdout);
});
