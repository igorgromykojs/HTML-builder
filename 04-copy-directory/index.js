var fs = require('fs');
var path = require('path');

// fs.rmdir(path.join(__dirname, 'files-copy'), err => {
//   if(err) throw err; // не удалось удалить папку
//    console.log('Папка успешно удалена');
// });
fs.mkdir(path.join(__dirname, 'files-copy'), err => {
});


let removeFolder = path.join(__dirname, 'files-copy');
fs.readdir(removeFolder, {withFileTypes: true}, (error, removeList) => {
  if (!error) {
    removeList.forEach((remove) =>{
      let removeFile = path.join(__dirname, 'files-copy', remove.name);
      fs.unlink(removeFile, err => {
        if(err) throw err; // не удалось удалить файл
     });
    })
  } else {
    console.error(error);
  }
})


let folder = path.join(__dirname, 'files');

fs.readdir(folder, {withFileTypes: true}, (error, dirEntryList) => {
  if (!error) {
    dirEntryList.forEach((dirEntry) => {
      let file = path.join(__dirname, 'files', dirEntry.name);
      let newFile = path.join(__dirname, 'files-copy', dirEntry.name);
      fs.copyFile(file, newFile, err => {
        if(err) throw err; // не удалось скопировать файл
      });
    })
  } else {
    console.error(error);
  }
});



