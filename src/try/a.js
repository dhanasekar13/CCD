  var path = require('path');
  var ncp = require('ncp').ncp;

  ncp.limit = 16;

  var srcPath = 'H:/ccd_technologies/project/a/g/b.zip'; //current folder
  var filename = srcPath.substring(srcPath.lastIndexOf('/'))
  var destPath = 'H:/ccd_technologies/project/a/h/'+filename; //Any destination folder

  console.log('Copying files...');
  ncp(srcPath, destPath, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Copying files complete.');
  });
