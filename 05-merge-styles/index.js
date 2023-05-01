var fs = require('fs');
var path = require('path');
var bundle = path.join(__dirname, 'project-dist', 'bundle.css');
let styleFolder = path.join(__dirname, 'styles');

fs.readdir(styleFolder, {withFileTypes: true}, (error, fileList) => {
  if (!error) {
    fs.writeFile(bundle, '', function(err){
      if (err) {
          console.log(err);
      } else {
          fileList.forEach((read) => {
            let file = path.join(styleFolder, read.name);
            fs.readFile(file, "utf8", function(error,data){
              if (error) {
                console.error(error);
              } else if (read.isFile() && path.extname(file) === '.css') {
                fs.appendFile(bundle, data, function(error){
                  if(error) console.error(error);     
              })}
            })
          })
        }
      });
  } else {
    console.error(error);
  }
})