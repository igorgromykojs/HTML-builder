var fs = require('fs');
var path = require('path');

let folder = path.join(__dirname, 'secret-folder')
fs.readdir(folder, {withFileTypes: true}, (error, dirEntryList) => {
  if (!error) {
    dirEntryList.forEach((dirEntry) => {
      if (dirEntry.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', dirEntry.name), (err, stats) => {
          if (err) {
            console.error(err)
            return
          }
          console.log(`${path.basename(path.join(__dirname, 'secret-folder', dirEntry.name), path.extname(path.join(__dirname, 'secret-folder', dirEntry.name)))} - ${path.extname(path.join(__dirname, 'secret-folder', dirEntry.name))} - ${stats.size/1000}kB`);
        });
      }
    })
  } else {
    console.error(error);
  }
});
